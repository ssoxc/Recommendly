import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "@/components"
import { RouteNames } from "@/navigators/RouteNames"
import { useHeader } from "@/utils/useHeader"
import { useAppTheme } from "@/utils/useAppTheme"
import { $styles, colors, ThemedStyle } from "@/theme"
import { Alert, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { translate } from "@/i18n"
import { useStores } from "@/models"
import { supabase } from "@/supabase/supabase"
import { observer } from "mobx-react-lite"

interface RegisterScreenProps extends AppStackScreenProps<RouteNames.Register> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const { themed } = useAppTheme()
  const authPasswordInput = useRef<TextInput>(null)
  const authPasswordConfirmationInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isAuthPasswordConfirmationHidden, setIsAuthPasswordConfirmationHidden] = useState(true)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      validationError,
      validationErrorPassword,
      authPassword,
      setAuthPassword,
      authPasswordConfirmation,
      setAuthPasswordConfirmation,
      validationErrorPasswordConfirmation,
    },
  } = useStores()
  useHeader({
    titleTx: "Join now!",
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  const error = validationError
  const errorPassword = validationErrorPassword
  const errorPasswordConfirmation = validationErrorPasswordConfirmation
  const isDisabled =
    !authEmail ||
    !!error ||
    !authPassword ||
    !!errorPassword ||
    !authPasswordConfirmation ||
    !!errorPasswordConfirmation

  const register = async () => {
    if (isDisabled) return
    const { error, data } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
      options: {
        emailRedirectTo: "https://oatdnwshffxmeyauogzm.supabase.co/auth/v1/callback",
        data: {
          role: "User",
        },
      },
    })
    if (error) {
      Alert.alert(error.message)
      return
    }
    setAuthToken(data.session?.access_token)
    navigation.navigate(RouteNames.RegisterOneLastStep)
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => {
              setIsAuthPasswordHidden(!isAuthPasswordHidden)
              setIsAuthPasswordConfirmationHidden(!isAuthPasswordConfirmationHidden)
            }}
          />
        )
      },
    [isAuthPasswordHidden, isAuthPasswordConfirmationHidden],
  )

  return (
    <Screen preset="fixed" style={themed($styles.container)}>
      <Text weight="bold" style={themed($headerTitle)}>
        Welcome to the Pointy family
      </Text>
      <Text weight="light" style={themed($subheading)}>
        Fill out your informations to start collecting rewards.
      </Text>
      <View style={themed($inputContainer)}>
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="registerScreen:email"
          placeholderTx="registerScreen:email"
          onSubmitEditing={register}
          helper={error}
          status={error ? "error" : undefined}
        />
        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="registerScreen:password"
          placeholderTx="registerScreen:password"
          onSubmitEditing={register}
          RightAccessory={PasswordRightAccessory}
          helper={errorPassword}
          status={errorPassword ? "error" : undefined}
        />
        <TextField
          ref={authPasswordConfirmationInput}
          value={authPasswordConfirmation}
          onChangeText={setAuthPasswordConfirmation}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordConfirmationHidden}
          labelTx="registerScreen:confirmPassword"
          placeholderTx="registerScreen:confirmPassword"
          RightAccessory={PasswordRightAccessory}
          onSubmitEditing={register}
          helper={errorPasswordConfirmation}
          status={errorPasswordConfirmation ? "error" : undefined}
        />
      </View>

      <View style={themed($continueBtnContainer)}>
        <Button
          disabled={isDisabled}
          style={!isDisabled ? themed($continueBtn) : themed($continueBtnDisabled)}
          testID="login-button"
          tx="registerScreen:register"
          preset="reversed"
          onPress={register}
        />
        <Text weight="semiBold" style={themed($termsAgreement)}>
          {translate("registerScreen:termsAgreement")}
        </Text>
      </View>
    </Screen>
  )
})

const $continueBtnDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(74, 18, 79, 0.6)",
  borderColor: colors.palette.neutral800,
})

const $termsAgreement: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
  fontSize: 10,
  lineHeight: 12,
  marginTop: 10,
})

const $inputContainer: ThemedStyle<ViewStyle> = () => ({
  gap: 20,
  marginTop: 30,
})

const $subheading: ThemedStyle<TextStyle> = () => ({
  fontSize: 12,
})

const $headerTitle: ThemedStyle<TextStyle> = () => ({
  fontSize: 20,
  fontWeight: "700",
})

const $continueBtnContainer: ThemedStyle<ViewStyle> = () => ({
  marginTop: "35%",
})

const $continueBtn: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(74, 18, 79, 1)",
  borderColor: colors.palette.neutral800,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})
