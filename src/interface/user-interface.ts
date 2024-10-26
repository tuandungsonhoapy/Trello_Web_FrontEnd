export interface userInterface {
  _id: string
  username: string
  email: string
  displayName: string
  avatar: string | null
  role: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string | null
  accessToken?: string
  refreshToken?: string
}
