import { boardInterface } from '@/interface/board-interface'
import { userInterface } from '@/interface/user-interface'

export interface boardInvitationInterface {
  boardId: string
  status: string
}

export interface invitationInterface {
  _id: string
  inviterId: string
  inviteeId: string
  type: string
  boardInvitation?: boardInvitationInterface
  inviter?: userInterface
  invitee?: userInterface
  board?: boardInterface
  createdAt: string
  updatedAt: string
  _destroy: boolean
}
