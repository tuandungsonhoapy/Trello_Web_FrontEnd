export interface userInterface {
  _id: string
  username: string
  email: string
  displayName: string
  avatar: string | null
  role: string
  require_2fa: boolean
  is_2fa_verified?: boolean
  isActive: boolean
  createdAt?: string
  updatedAt?: string | null
  accessToken?: string
  refreshToken?: string
}
