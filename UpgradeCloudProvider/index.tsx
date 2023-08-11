import { canManagePayment } from "@illa-public/user-role-utils"
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react"
import { useSelector } from "react-redux"
import {
  InsufficientNoticeModal,
  InsufficientNoticeModalType,
  insufficientModalConfigKeys,
} from "@/illa-public-component/UpgradeCloudProvider/component/InsufficientNoticeModal"
import {
  SubscriptionReminderModal,
  UpgradeModalType,
  upgradeModalConfigKeys,
} from "@/illa-public-component/UpgradeCloudProvider/component/SubscriptionReminderModal"
import {
  DrawerDefaultConfig,
  UpgradeDrawer,
} from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeDrawer"
import {
  UpgradeSuccessModal,
  UpgradeSuccessModalType,
} from "@/illa-public-component/UpgradeCloudProvider/component/UpgradeSuccessModal"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"

interface ProviderProps {
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleLicenseDrawerVisible: (
    visible: boolean,
    drawerConfig: DrawerDefaultConfig,
  ) => void
  handleSuccessModalVisible: (
    visible: boolean,
    modalType: UpgradeSuccessModalType,
  ) => void
  handleUpgradeModalVisible: (
    visible: boolean,
    modalType: UpgradeModalType | InsufficientNoticeModalType,
  ) => void
}

export const UpgradeCloudContext = createContext<Inject>({} as Inject)

export const UpgradeCloudProvider: FC<ProviderProps> = (props) => {
  const { children } = props
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const [drawerConfig, setDrawerConfig] = useState<DrawerDefaultConfig>({
    type: "license",
  })
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalType, setSuccessModalType] =
    useState<UpgradeSuccessModalType>()
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false)
  const [upgradeModalType, setUpgradeModalType] = useState<
    UpgradeModalType | InsufficientNoticeModalType
  >()

  const canPay = useMemo(
    () =>
      canManagePayment(
        currentTeamInfo?.myRole,
        currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
      ),
    [
      currentTeamInfo?.myRole,
      currentTeamInfo?.totalTeamLicense?.teamLicenseAllPaid,
    ],
  )

  const handleLicenseDrawerVisible = (
    visible: boolean,
    config: DrawerDefaultConfig,
  ) => {
    setDrawerConfig(config)
    setDrawerVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleSuccessModalVisible = (
    visible: boolean,
    modalType: UpgradeSuccessModalType,
  ) => {
    setSuccessModalType(modalType)
    setSuccessModalVisible((prevState) => {
      if (prevState !== visible) {
        return visible
      }
      return prevState
    })
  }

  const handleUpgradeModalVisible = useCallback(
    (
      visible: boolean,
      modalType: UpgradeModalType | InsufficientNoticeModalType,
    ) => {
      if (
        canPay
          ? upgradeModalConfigKeys.includes(modalType)
          : insufficientModalConfigKeys.includes(modalType)
      ) {
        setUpgradeModalType(modalType)
        setUpgradeModalVisible((prevState) => {
          if (prevState !== visible) {
            return visible
          }
          return prevState
        })
      }
    },
    [canPay],
  )

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
      <UpgradeDrawer
        visible={drawerVisible}
        defaultConfig={drawerConfig}
        onCancel={handleCloseDrawer}
      />
      <UpgradeSuccessModal
        configType={successModalType}
        visible={successModalVisible}
        onCancel={handleCloseSuccessModal}
      />
      {canPay ? (
        <>
          <SubscriptionReminderModal
            configType={upgradeModalType as UpgradeModalType}
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      ) : (
        <>
          <InsufficientNoticeModal
            configType={upgradeModalType as InsufficientNoticeModalType}
            visible={upgradeModalVisible}
            onCancel={handleCloseUpgradeModal}
          />
        </>
      )}
    </UpgradeCloudContext.Provider>
  )
}

UpgradeCloudProvider.displayName = "UpgradeCloudProvider"
