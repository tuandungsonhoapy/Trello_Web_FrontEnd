import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from '@/pages/Boards/BoardContent/ListColumns/ListColumns'
import {
  boardInterface,
  cardInterface,
  columnInterface
} from '@/interface/board-interface'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  DragOverEvent,
  UniqueIdentifier,
  closestCorners,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useSensor, useSensors } from '@dnd-kit/core'
import { cloneDeep, isEmpty } from 'lodash'

import { MouseSensor, TouchSensor } from '@/customLibraries/DndKitSensors'
import Column from '@/pages/Boards/BoardContent/ListColumns/Column/Column'
import Card from '@/pages/Boards/BoardContent/ListColumns/Column/ListCards/Card/Card'
import { generatePlaceholderCard } from '@/utils/formatter'
import { moveCardToAnotherColumnAPI, updateBoardAPI } from '@/apis/boardAPI'
import { updateColumnAPI } from '@/apis/columnAPI'
import { updateBoard, updateColumn } from '@/redux/boardsSlice'
import { useAppDispatch } from '@/hooks/reduxHooks'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN_TYPE',
  CARD: 'CARD_TYPE'
}

function BoardContent({ board }: { board: boardInterface | null }) {
  const [columns, setColumns] = useState<Array<columnInterface>>([])

  const dispatch = useAppDispatch()

  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(
    null
  )
  const [activeDragItemId, setActiveDragItemId] = useState<
    string | number | null
  >(null)
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null)
  const [oldColumn, setOldColumn] = useState<columnInterface | null>(null)

  // * Điểm va chạm cuối cùng
  const lastOverId = useRef<UniqueIdentifier | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const findColumnByCardId = (cardId: UniqueIdentifier) => {
    return columns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId.toString())
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id) || null)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    if (!over || !active) return
    if (active.id === over.id) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // * Xác định 2 column active và over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // * Cập nhật lại columns khi kéo card qua column khác
    if (activeColumn._id !== overColumn._id) {
      setColumns((prev) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        )

        // * Tìm vị trí index mới của card khi kéo qua column khác
        let newCardIndex

        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        if (overCardIndex)
          newCardIndex =
            overCardIndex >= 0
              ? overCardIndex + modifier
              : overColumn?.cards
              ? overColumn.cards.length + 1
              : 0

        const newColumns = cloneDeep(prev)
        const newActiveColumn = newColumns.find(
          (column) => column._id === activeColumn._id
        )
        const newOverColumn = newColumns.find(
          (column) => column._id === overColumn._id
        )

        // * Cập nhật lại dữ liệu cards cho active column
        if (newActiveColumn) {
          newActiveColumn.cards = newActiveColumn?.cards?.filter(
            (card) => card._id !== activeDraggingCardId
          )

          // * Thêm placeholder card nếu list card rỗng
          if (isEmpty(newActiveColumn.cards)) {
            newActiveColumn.cards = [generatePlaceholderCard(newActiveColumn)]
          }

          newActiveColumn.cardOrderIds = newActiveColumn.cards?.map(
            (card) => card._id
          )

          setOldColumn(newActiveColumn)
        }

        // * Cập nhật lại dữ liệu cards cho over column
        if (newOverColumn) {
          newOverColumn.cards = newOverColumn?.cards?.filter(
            (card) =>
              card._id !== activeDraggingCardId && !card.FE_PlaceholderCard
          )

          // * Cập nhật lại giá trị columnId cho card khi kéo qua column khác
          const newActiveDragItemData = cloneDeep(activeDragItemData)
          if (newActiveDragItemData)
            newActiveDragItemData.columnId = newOverColumn._id

          setActiveDragItemData(newActiveDragItemData)

          newOverColumn.cards = newOverColumn?.cards?.toSpliced(
            newCardIndex,
            0,
            newActiveDragItemData
          )

          newOverColumn.cardOrderIds = newOverColumn.cards?.map(
            (card) => card._id
          )
        }

        return newColumns
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // * Xử lý kéo thả card giữa các column
      if (oldColumn && oldColumn._id !== overColumn._id) {
        setColumns((prev) => {
          const newColumns = cloneDeep(prev)

          // * Column mới chứa card được kéo qua
          const newColumn = newColumns.find(
            (column) => column._id === overColumn._id
          )
          if (newColumn) {
            const newCardIndex = newColumn.cards?.findIndex(
              (card) => card._id === overCardId
            )
            const oldCardIndex = newColumn.cards?.findIndex(
              (card) => card._id === activeDragItemId
            )

            if (newCardIndex !== undefined && oldCardIndex !== undefined) {
              newColumn.cards = arrayMove(
                newColumn.cards || [],
                oldCardIndex,
                newCardIndex
              )
              newColumn.cardOrderIds = newColumn.cards.map((card) => card._id)
            }
          }

          // * Cập nhật activeBoard trong store Redux
          dispatch(
            updateBoard({
              columns: newColumns,
              columnOrderIds: newColumns.map((column) => column._id)
            } as boardInterface)
          )

          // * Call API
          let cardOrderIdsOfOldColumn = oldColumn?.cardOrderIds || []
          if (cardOrderIdsOfOldColumn[0].includes('placeholder-card'))
            cardOrderIdsOfOldColumn = []
          moveCardToAnotherColumnAPI({
            fromColumnId: oldColumn._id,
            toColumnId: overColumn._id,
            cardId: activeDraggingCardId.toString(),
            cardOrderIdsOfOldColumn,
            cardOrderIdsOfNewColumn: newColumn?.cardOrderIds || []
          })
          return newColumns
        })
      } else {
        // * Xử lý kéo thả card trong cùng 1 column
        const oldCardIndex = oldColumn?.cards?.findIndex(
          (card) => card._id === activeDraggingCardId
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (card) => card._id === overCardId
        )

        let dndOrderedCards: Array<cardInterface> = []

        if (oldCardIndex !== undefined && newCardIndex !== undefined) {
          dndOrderedCards = arrayMove(
            oldColumn?.cards || [],
            oldCardIndex,
            newCardIndex
          )
        }
        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)
        setColumns((prev) => {
          const newColumns = cloneDeep(prev)
          const newColumn = newColumns.find(
            (column) => column._id === overColumn._id
          )
          if (
            newColumn &&
            newCardIndex !== undefined &&
            oldCardIndex !== undefined
          ) {
            newColumn.cards = dndOrderedCards
            newColumn.cardOrderIds = dndOrderedCardIds
          }
          return newColumns
        })

        // * Call API update cardOrderIds
        if (oldColumn?._id) {
          // * Cập nhật state overColumn thuộc activeBoard trong store Redux
          dispatch(
            updateColumn({
              cardOrderIds: dndOrderedCardIds,
              cards: dndOrderedCards,
              _id: oldColumn._id
            } as columnInterface)
          )
          // * Call API
          updateColumnAPI(oldColumn?._id, {
            cardOrderIds: dndOrderedCardIds
          } as columnInterface)
        }
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = columns.findIndex(
          (column) => column._id === active.id
        )
        const newColumnIndex = columns.findIndex(
          (column) => column._id === over.id
        )

        const dndOrderedColumns = arrayMove(
          columns,
          oldColumnIndex,
          newColumnIndex
        )
        const dndOrderedColumnIds = dndOrderedColumns.map(
          (column) => column._id
        )

        setColumns(dndOrderedColumns)

        // * Call API update columnOrderIds
        if (board?._id) {
          // * Cập nhật state activeBoard trong store Redux
          dispatch(
            updateBoard({
              columnOrderIds: dndOrderedColumnIds,
              columns: dndOrderedColumns
            } as boardInterface)
          )

          // * Call API
          updateBoardAPI(board._id, {
            columnOrderIds: dndOrderedColumnIds
          } as boardInterface)
        }
      }
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumn(null)
    lastOverId.current = null
  }

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        return closestCorners(args)

      const pointerIntersections = pointerWithin(args)

      if (!pointerIntersections?.length) return []

      const intersections =
        pointerIntersections?.length > 0
          ? pointerIntersections
          : rectIntersection(args)

      // * Tìm overId đầu tiên trong intersections
      let overId = getFirstCollision(intersections, 'id')

      if (overId) {
        /**
         *  Nếu overId là column thì sẽ tìm cardId gần nhất trong khu vực
         *  va chạm dựa vào thuật toán ClosestCenter.
         */
        const intersectionColumn = columns.find(
          (column) => column._id === overId
        )
        if (intersectionColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                intersectionColumn?.cardOrderIds?.includes(
                  container.id.toString()
                )
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, columns]
  )

  useEffect(() => {
    setColumns(board?.columns || [])
  }, [board])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}
    >
      <Box
        sx={{
          display: 'flex',
          height: (theme) => theme.trelloCustom.boardContentHeight,
          width: '100%',
          bgcolor: (theme) => theme.palette.background.default,
          p: '6px 0'
        }}
      >
        <ListColumns columns={columns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
