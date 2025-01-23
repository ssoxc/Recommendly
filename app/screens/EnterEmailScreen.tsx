import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { RouteNames } from "@/navigators/RouteNames"

interface LoginScreenProps extends AppStackScreenProps<RouteNames.EnterEmail> {}

export const EnterEmailScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const { navigation } = _props
  const {
    authenticationStore: { authEmail, setAuthEmail, validationError },
  } = useStores()

  const { themed } = useAppTheme()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("test@test.com")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthEmail("")
    }
  }, [setAuthEmail])

  const error = validationError
  const isDisabled = !authEmail || !!error

  useHeader(
    {
      titleTx: "loginScreen:logIn",
      leftIcon: "back",
      onLeftPress: () => navigation.goBack(),
      containerStyle: themed(() => ({
        alignContent: "center",
      })) as ViewStyle,
    },
    [],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$styles.flex1}>
        <Text tx="loginScreen:niceToSeeYou" preset="subheading" style={themed($enterDetails)} />

        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen:emailFieldLabel"
          placeholderTx="loginScreen:emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
        <View style={[$styles.row, themed({ gap: 3 })]}>
          <Text
            size="xxs"
            tx="loginScreen:forgotEmail"
            preset="subheading"
            style={themed($forgotEmail)}
          />
          <Text
            size="xxs"
            tx="loginScreen:letUsKnow"
            preset="subheading"
            style={themed($letUsKnow)}
          />
        </View>
      </View>
      <Button
        disabled={isDisabled}
        style={!isDisabled ? themed($continueBtn) : themed($continueBtnDisabled)}
        testID="login-button"
        tx="loginScreen:continue"
        preset="reversed"
        onPress={() => navigation.navigate(RouteNames.EnterPassword)}
      />
    </Screen>
  )
})

const $continueBtnDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(74, 18, 79, 0.6)",
  borderColor: colors.palette.neutral800,
})

const $continueBtn: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(74, 18, 79, 1)",
  borderColor: colors.palette.neutral800,
})

const $forgotEmail: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
})

const $letUsKnow: ThemedStyle<TextStyle> = () => ({
  color: "rgba(55, 181, 244, 1)",
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-between",
  flex: 1,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})
