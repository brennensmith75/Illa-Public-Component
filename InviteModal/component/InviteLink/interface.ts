import { USER_ROLE } from "@illa-public/user-data"

export interface InviteLinkProps {
  defaultInviteUserRole: USER_ROLE
  defaultAllowInviteLink: boolean
  teamID: string
  currentUserRole: USER_ROLE
  balance: number
  onInviteLinkStateChange: (allowInviteLink: boolean) => void
  onCopyInviteLink: (inviteLink: string) => void
}