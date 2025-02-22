import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { RouteNames } from "@/navigators/RouteNames"
import { supabase } from "@/supabase/supabase"

interface LoginScreenProps extends AppStackScreenProps<RouteNames.EnterPassword> {}

export const EnterPasswordScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>(null)
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [_, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { setAuthToken, validationError, authEmail },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthPassword("test1234")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
    }
  }, [setAuthPassword])

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    const { error, data } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    })

    if (error) {
      Alert.alert(error.message)
    }

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")

    // We'll mock this with a fake token.
    setAuthToken(data.session?.access_token)
  }

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

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={$styles.flex1}>
        <Text tx="loginScreen:enterPassword" preset="subheading" style={themed($enterDetails)} />
        {attemptsCount > 2 && (
          <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
        )}

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
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
        style={themed($continueBtn)}
        testID="login-button"
        tx="loginScreen:continue"
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
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

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})
