import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { TextLink } from "@illa-public/text-link"
import { FC, useContext } from "react"
import { Trans, useTranslation } from "react-i18next"
import { handleLinkOpen } from "@/utils/navigate"
import { ReactComponent as ILLALogoWhite } from "../assets/illa-logo-white.svg"
import { LayoutProps } from "../layout/interface"
import {
  illaLogoStyle,
  layoutWrapperStyle,
  leftAsideWrapperStyle,
  policyStyle,
  rightAsideWrapperStyle,
  sectionBackgroundStyle,
  sloganStyle,
} from "../layout/style"

export const UserLayout: FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const { track } = useContext(MixpanelTrackContext)

  const handleLinkOpenClick = (link: string) => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: /privacy/.test(link) ? "privacy" : "terms",
    })
    handleLinkOpen(link)
  }

  return (
    <div css={layoutWrapperStyle}>
      <aside css={leftAsideWrapperStyle}>
        <ILLALogoWhite css={illaLogoStyle} />
        <span css={sloganStyle}>{t("page.user.description")}</span>
        <section css={sectionBackgroundStyle} />
      </aside>
      <aside css={rightAsideWrapperStyle}>
        {children}
        <span css={policyStyle}>
          <Trans
            i18nKey="page.user.policy"
            t={t}
            components={[
              <TextLink
                key="text-link"
                onClick={() => {
                  handleLinkOpenClick("/privacy-policy")
                }}
              />,
              <TextLink
                key="text-link"
                onClick={() => {
                  handleLinkOpenClick("/terms-and-conditions")
                }}
              />,
            ]}
          />
        </span>
      </aside>
    </div>
  )
}

UserLayout.displayName = "UserLayout"
