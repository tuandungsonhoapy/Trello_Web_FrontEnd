export interface cardInterface {
  _id: string
  boardId: string
  columnId: string
  title?: string
  description?: string | null
  cover?: string | null
  memberIds?: Array<string>
  comments?: Array<string>
  attachments?: Array<string>
  FE_PlaceholderCard?: boolean
}

export interface columnInterface {
  _id: string
  boardId: string
  title?: string
  cardOrderIds?: Array<string>
  cards?: Array<cardInterface>
}

export interface boardInterface {
  _id: string
  title: string
  description: string
  type: string
  ownerIds: Array<any>
  memberIds: Array<any>
  columnOrderIds: Array<string>
  columns?: Array<columnInterface>
}
