/* eslint-disable import/no-named-as-default-member */
import mixpanel from "mixpanel-browser"
import {
  ILLAProperties,
  ILLA_MIXPANEL_EVENT_TYPE,
  ILLA_PAGE_NAME,
} from "./interface"
import { getBrowserLanguage, getDeviceUUID, getIllaLanguage } from "./utils"

export * from "./interface"
export * from "./mixpanelContext"
class ILLAMixpanelTools {
  private static instance: ILLAMixpanelTools | null = null
  private enable: boolean = false

  constructor() {
    this.enable =
      process.env.ILLA_INSTANCE_ID === "CLOUD" &&
      !!process.env.ILLA_MIXPANEL_API_KEY
    if (this.enable) {
      mixpanel.init(process.env.ILLA_MIXPANEL_API_KEY as string, {
        debug: process.env.ILLA_APP_ENV === "development",
        test: process.env.ILLA_APP_ENV !== "production",
        ignore_dnt: process.env.ILLA_APP_ENV === "development",
        loaded(mixpanelProto) {
          getDeviceUUID().then((deviceID) => {
            mixpanelProto.identify(deviceID)
            const originalTrack = mixpanelProto.track
            mixpanelProto.track = function (event, properties) {
              originalTrack.call(mixpanelProto, event, {
                ...properties,
                $device_id: deviceID,
                environment:
                  process.env.ILLA_APP_ENV === "development"
                    ? "development"
                    : process.env.ILLA_APP_ENV,
                browser_language: getBrowserLanguage(),
                illa_language: getIllaLanguage(),
                $user_id: properties?.user_id,
                fe_version_code: process.env.ILLA_APP_VERSION,
              })
            }
          })
        },
      })
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ILLAMixpanelTools()
    }

    return this.instance
  }

  public track(event: ILLA_MIXPANEL_EVENT_TYPE, properties: ILLAProperties) {
    if (this.enable) {
      mixpanel.track(event, {
        ...properties,
      })
    }
  }

  public setGroup(teamIdentifier: string | string[]) {
    if (this.enable) {
      mixpanel.set_group("team", teamIdentifier)
    }
  }

  public pageTimeEvent() {
    if (this.enable) {
      mixpanel.time_event("page_duration")
    }
  }

  public trackTimeEvent(pageName: ILLA_PAGE_NAME, teamIdentifier: string) {
    if (this.enable) {
      mixpanel.track("page_duration", {
        page: pageName,
        team_id: teamIdentifier,
      })
    }
  }
}

export const ILLAMixpanel = ILLAMixpanelTools.getInstance()
