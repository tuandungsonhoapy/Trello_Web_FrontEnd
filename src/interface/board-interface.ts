import { commnetInterface } from '@/interface/comment-interface'
import { userInterface } from '@/interface/user-interface'

export interface cardInterface {
  _id: string
  boardId: string
  columnId: string
  title?: string
  description?: string | null
  cover?: string | null
  memberIds?: Array<string>
  comments?: Array<commnetInterface>
  attachments?: Array<string>
  createdAt?: string
  FE_PlaceholderCard?: boolean
}

export interface columnInterface {
  _id: string
  boardId: string
  title?: string
  cardOrderIds?: Array<string>
  cards?: Array<cardInterface>
  createdAt?: string
}

export interface boardInterface {
  _id: string
  title: string
  description: string
  slug?: string
  type?: string
  ownerIds?: Array<string>
  memberIds?: Array<string>
  columnOrderIds: Array<string>
  columns?: Array<columnInterface>
  createdAt?: string
  FE_allUsers: Array<userInterface>
  owners?: Array<userInterface>
  members?: Array<userInterface>
}
