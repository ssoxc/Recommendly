import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, Text, Screen } from "@/components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useHeader } from "../utils/useHeader"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"
import { RouteNames } from "@/navigators/RouteNames"

interface WelcomeScreenProps extends AppStackScreenProps<RouteNames.Welcome> {}

const prizeReward = require("../../assets/images/prize-reward.png")

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { themed } = useAppTheme()

  const { navigation } = _props
  const {
    authenticationStore: { setIsFirstStartup },
  } = useStores()

  useHeader(
    {
      titleTx: "common:punkto",
      containerStyle: themed(
        () =>
          ({
            backgroundColor: "rgba(217, 217, 217, 1)",
          }) as ViewStyle,
      ),
      titleStyle: themed(() => ({
        fontSize: 24,
      })) as TextStyle,
    },
    [setIsFirstStartup],
  )

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen
      preset="fixed"
      style={themed({ backgroundColor: "rgba(217, 217, 217, 1)" })}
      contentContainerStyle={$styles.flex1}
    >
      <View style={themed($topContainer)}>
        <Image style={themed(prizeIcon)} source={prizeReward} resizeMode="contain" />
        <Text tx="welcomeScreen:heading" preset="heading" style={themed($welcomeHeading)} />
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Button
          style={themed($newHereButton)}
          textStyle={themed({ color: "white" })}
          testID="new-here-button"
          preset="filled"
          tx="welcomeScreen:newHere"
        />
        <Button
          onPress={() => navigation.navigate(RouteNames.EnterEmail)}
          style={themed($loginButton)}
          testID="welcome-login-button"
          preset="filled"
          tx="welcomeScreen:login"
        />
        <Text style={themed($termsAgreement)} size="xs" tx="welcomeScreen:termsAgreement" />
      </View>
    </Screen>
  )
})

const $termsAgreement: ThemedStyle<TextStyle> = () => ({
  color: "gray",
})

const $newHereButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "rgba(74, 18, 79, 1)",
  borderWidth: 1,
  borderRadius: 8,
})

const $loginButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "white",
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  display: "flex",
  alignItems: "flex-start",
  marginLeft: spacing.xxl,
  justifyContent: "center",
})

const prizeIcon: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 53,
  width: 73,
  marginBottom: spacing.lg,
})

const $welcomeHeading: ThemedStyle<TextStyle> = () => ({
  width: "70%",
  fontSize: 48,
  fontWeight: "700",
  lineHeight: 58,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.lg,
  margin: spacing.xxl,
})
