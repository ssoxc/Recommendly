import { $styles, colors, ThemedStyle } from "@/theme"
import { Button, Icon, Screen, Text } from "../../components"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC } from "react"
import { RouteNames } from "@/navigators/RouteNames"
import { View, ViewStyle, TextStyle } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { AppStackScreenProps } from "@/navigators"

export const QrScreen: FC<AppStackScreenProps<RouteNames.QRModal>> = ({ navigation }) => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" safeAreaEdges={["bottom"]}>
      <View style={[themed($header), $styles.row]}>
        <View style={themed($scanContainer)}>
          <Text size="lg" weight="semiBold" style={themed($scanText)}>
            Scan
          </Text>
        </View>
        <View>
          <Icon
            icon="x"
            size={30}
            color={colors.palette.neutral500}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={[themed($qrContainer), themed($centered), $styles.container]}>
        <QRCode size={300} value="https://fuckyoucoin.my.canva.site/" />

        <View style={themed($accountContainer)}>
          <Text size="lg" weight="semiBold" style={themed($accountText)}>
            My account
          </Text>
          <Text size="xs" style={themed($emailText)}>
            randomemail@gmail.com
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
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </Screen>
  )
}

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
