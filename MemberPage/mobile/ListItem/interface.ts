import { USER_ROLE, USER_STATUS } from "@illa-public/user-data"

export interface ListItemProps {
  nickName: string
  userID: string
  email: string
  status: USER_STATUS
  userRole: USER_ROLE
  avatarURL?: string
  currentUserID: string
  currentUserRole: USER_ROLE
}
