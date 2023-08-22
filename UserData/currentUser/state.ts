import { CurrentUser } from "./interface"

export const CurrentUserInitialState: CurrentUser = {
  userID: "",
  uid: "",
  nickname: "",
  language: "",
  email: "",
  avatar: "",
  isTutorialViewed: false,
  isPasswordSetted: false,
  ssoVerified: {
    github: false,
    google: false,
  },
  isNewUser: false,
  haveAppSumoSubscription: false,
  doesAppSumoSubscriptionAppliedToTeam: false,
  createdAt: "",
  updatedAt: "",
}
