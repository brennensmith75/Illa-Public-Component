import { createSlice } from "@reduxjs/toolkit"
import {
  addTeamItemReducer,
  deleteMemberListReducer,
  deleteTeamInfoReducer,
  updateCurrentIdReducer,
  updateCurrentMemberListReducer,
  updateCurrentRoleReducer,
  updateCurrentTeamInfoReducer,
  updateCurrentTeamLicenseByTeamIDReducer,
  updateCurrentTeamLicenseReducer,
  updateCurrentTeamPersonalConfigReducer,
  updateInvitedUserReducer,
  updateMemberListReducer,
  updateTeamItemsReducer,
  updateTeamMemberPermissionReducer,
  updateTeamMemberSubscribeReducer,
  updateTeamMemberUserRoleReducer,
  updateTeamReducer,
  updateTransUserRoleReducer,
} from "./reducer"
import { teamInitialState } from "./state"

const teamSlice = createSlice({
  name: "team",
  initialState: teamInitialState,
  reducers: {
    updateTeamReducer,
    updateCurrentIdReducer,
    updateTeamItemsReducer,
    updateCurrentRoleReducer,
    updateMemberListReducer,
    updateTransUserRoleReducer,
    updateTeamMemberUserRoleReducer,
    updateTeamMemberPermissionReducer,
    updateTeamMemberSubscribeReducer,
    updateCurrentTeamLicenseReducer,
    updateCurrentTeamPersonalConfigReducer,
    addTeamItemReducer,
    updateCurrentMemberListReducer,
    deleteMemberListReducer,
    updateInvitedUserReducer,
    deleteTeamInfoReducer,
    updateCurrentTeamLicenseByTeamIDReducer,
    updateCurrentTeamInfoReducer,
  },
})

export const teamActions = teamSlice.actions
export const teamReducer = teamSlice.reducer
