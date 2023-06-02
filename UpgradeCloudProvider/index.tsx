import { InsufficientNoticeModal } from "illa-public-component/UpgradeCloudProvider/component/InsufficientNoticeModal"
import { FC, ReactNode, createContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { SubscriptionReminderModal } from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal"
import { UpgradeDrawer } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeDrawer"
import { UpgradeSuccessModal } from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal"
import { canManagePayment } from "@/illa-public-component/UserRoleUtils"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import {
  getCurrentTeamInfo,
  getCurrentTeamRole,
} from "@/store/team/teamSelector"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (visible: boolean) => void
  handleSuccessModalVisible: (visible: boolean) => void
  handleUpgradeModalVisible: (visible: boolean) => void
}

export const UpgradeCloudContext = createContext<Inject>({} as Inject)

export const UpgradeCloudProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const { t } = useTranslation()
  const currentTeamInfo = useSelector(getCurrentTeamInfo)

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false)

  const canPay = useMemo(
    () =>
      canManagePayment(
        currentTeamInfo?.myRole ?? USER_ROLE.VIEWER,
        currentTeamInfo?.teamSubscriptionStatus,
      ),
    [currentTeamInfo?.myRole, currentTeamInfo?.teamSubscriptionStatus],
  )

  const handleLicenseDrawerVisible = (visible: boolean) => {
    setDrawerVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleSuccessModalVisible = (visible: boolean) => {
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleUpgradeModalVisible = (visible: boolean) => {
    setUpgradeModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleCloseDrawer = () => {
    setDrawerVisible(false)
  }

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false)
  }
  const handleCloseUpgradeModal = () => {
    setUpgradeModalVisible(false)
  }

  const value = {
    ...props,
    handleLicenseDrawerVisible,
    handleSuccessModalVisible,
    handleUpgradeModalVisible,
  }

  return (
    <UpgradeCloudContext.Provider value={value}>
      {children}
      <UpgradeDrawer visible={drawerVisible} onCancel={handleCloseDrawer} />
      <UpgradeSuccessModal
        visible={successModalVisible}
        onCancel={handleCloseSuccessModal}
      />
      {canPay ? (
        <>
          <SubscriptionReminderModal
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      ) : (
        <>
          <InsufficientNoticeModal
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      )}
    </UpgradeCloudContext.Provider>
  )
}

UpgradeCloudProvider.displayName = "UpgradeCloudProvider"
