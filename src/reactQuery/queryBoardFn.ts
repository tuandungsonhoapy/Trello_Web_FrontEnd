import { getBoardsAPI } from '@/apis/boardAPI'
import { boardInterface } from '@/interface/board-interface'
import { boardKeys } from '@/reactQuery/queryKeys'
import { DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } from '@/utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export interface useQueryBoardProps {
  isKeepPreviousData?: boolean
  page: number
  limit?: number
}

export const useQueryBoard = ({
  isKeepPreviousData = false,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT_PER_PAGE
}: useQueryBoardProps) => {
  const queryInfo = useQuery({
    queryKey: boardKeys.fetchBoardsPagination(page),
    queryFn: async (): Promise<{
      boards: Array<boardInterface>
      numberBoards: number
    }> => {
      return await getBoardsAPI(`?page=${page}&limit=${limit}`)
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
    staleTime: 1000 * 60 * 30
  })

  return queryInfo
}
