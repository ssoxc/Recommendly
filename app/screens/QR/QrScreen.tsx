import { $styles, colors, ThemedStyle } from "@/theme"
import { Button, Icon, Screen, Text } from "../../components"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC, useEffect, useState } from "react"
import { RouteNames } from "@/navigators/RouteNames"
import { View, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { QRScanOperation, QRScanPayload } from "@/utils/QrScanPayload"
import { supabase } from "@/supabase/supabase"
import { User } from "@supabase/auth-js"
import { MainTabScreenProps } from "@/navigators/MainNavigator"
import { RootStackParamList } from "@/navigators/MainNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
type Props =
  | MainTabScreenProps<RouteNames.QR>
  | NativeStackScreenProps<RootStackParamList, RouteNames.QRModal>

export const QrScreen: FC<Props> = observer(({ navigation, route }) => {
  const { themed } = useAppTheme()
  const [user, setUser] = useState<User | null>(null)
  const [qrPayload, setQrPayload] = useState<QRScanPayload | null>(null)
  const [rewardId, setRewardId] = useState<string | null>(null)
  const { cardStore } = useStores()

  useEffect(() => {
    console.log("rewardId", route.params?.rewardId)
    if (route.params?.rewardId) {
      setRewardId(route.params.rewardId)
    }
  }, [route.params?.rewardId])

  useEffect(() => {
    const getUser = async (rwId: string | null) => {
      try {
        const {
          data: { user: supabaseUser },
        } = await supabase.auth.getUser()
        if (!supabaseUser) {
          return
        }
        if (!user) {
          setUser(supabaseUser)
        }

        if (rwId) {
          setQrPayload({
            userId: supabaseUser.id,
            operation: QRScanOperation.SUBTRACT_STORE_POINTS,
            rewardId: rwId,
          })
        } else {
          setQrPayload({
            userId: supabaseUser.id,
            operation: QRScanOperation.CREATE_STORE_CARD,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    getUser(rewardId)
  }, [rewardId, user])

  useEffect(() => {
    console.log("useEffect")
    cardStore.setQrScreenVisible(true)
    return () => {
      console.log("unmount")
      cardStore.setQrScreenVisible(false)
    }
  }, [])

  const handleClose = () => {
    cardStore.setQrScreenVisible(false)
    navigation.goBack()
  }

  if (!qrPayload) {
    return <ActivityIndicator />
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["bottom"]}>
      <View style={[themed($header), $styles.row]}>
        <View style={themed($scanContainer)}>
          <Text size="lg" weight="semiBold" style={themed($scanText)}>
            {rewardId ? `Scan to redeem` : "Scan"}
          </Text>
        </View>
        <View>
          <Icon icon="x" size={30} color={colors.palette.neutral500} onPress={handleClose} />
        </View>
      </View>
      <View style={[themed($qrContainer), themed($centered), $styles.container]}>
        <QRCode size={300} value={qrPayload ? JSON.stringify(qrPayload) : ""} />

        <View style={themed($accountContainer)}>
          <Text size="lg" weight="semiBold" style={themed($accountText)}>
            My account
          </Text>
          <Text size="xs" style={themed($emailText)}>
            {user?.email}
          </Text>
          <Text size="xs" style={themed($descriptionText)}>
            This is your personal QR code! Scan it at Punkto terminals to collect points and unlock
            exciting rewards. Keep it handy and start enjoying the benefits today!
          </Text>
        </View>
        <View style={themed($buttonContainer)}>
          <Button
            textStyle={themed($buttonText)}
            style={themed($button)}
            tx="common:close"
            onPress={handleClose}
          />
        </View>
      </View>
    </Screen>
  )
})

const $scanText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginLeft: spacing.md,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.md,
  backgroundColor: "rgba(217, 217, 217, 0.5)",
  height: 50,
})

const $scanContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
})

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.md,
  width: 130,
  borderRadius: 15,
  backgroundColor: colors.palette.neutral500,
  color: colors.palette.neutral100,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  textAlign: "center",
})

const $accountContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxxs,
  alignItems: "center",
})

const $emailText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
})

const $centered: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
})

const $accountText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $qrContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.md,
})
