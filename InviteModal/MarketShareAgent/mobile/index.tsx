import { FC } from "react"
import {
  CloseIcon,
  Drawer,
  TriggerProvider,
} from "@illa-design/react"
import { AgentToMarketplaceMobile } from "../../component/AgentToMarketplace/mobile"
import { MarketShareAgentProps } from "../interface"
import {
  closeIconContainerStyle,
  contentContainerStyle,
  inviteHeaderContainerStyle,
  inviteModalStyle,
} from "./style"

export const MarketShareAgentMobile: FC<MarketShareAgentProps> = (props) => {
  const { onClose } = props

  return (
    <TriggerProvider renderInBody zIndex={1005}>
      <Drawer
        _css={inviteModalStyle}
        w="100%"
        placement="bottom"
        maskClosable={false}
        closable={false}
        footer={false}
        onCancel={onClose}
        visible={true}
      >
        <div css={inviteHeaderContainerStyle}>
          <div
            css={closeIconContainerStyle}
            onClick={() => {
              props.onClose?.()
            }}
          >
            <CloseIcon size="12" />
          </div>
        </div>
        <div css={contentContainerStyle}>
          <AgentToMarketplaceMobile
            defaultAgentContributed={props.defaultAgentContributed}
            onAgentContributed={props.onAgentContributed}
            agentID={props.agentID}
            onCopyAgentMarketLink={props.onCopyAgentMarketLink}
            userRoleForThisAgent={props.userRoleForThisAgent}
            ownerTeamID={props.ownerTeamID}
          />
        </div>
      </Drawer>
    </TriggerProvider>
  )
}

MarketShareAgentMobile.displayName = "MarketShareAgentMobile"