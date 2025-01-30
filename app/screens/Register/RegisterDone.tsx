import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "../../components/Screen"
import { Text } from "../../components/Text"
import { AppStackScreenProps } from "@/navigators"
import { RouteNames } from "@/navigators/RouteNames"
import { useAppTheme } from "@/utils/useAppTheme"
import { $styles, ThemedStyle } from "@/theme"
import { Button, Icon } from "@/components"
import { useStores } from "@/models"

interface RegisterDoneScreenProps extends AppStackScreenProps<RouteNames.RegisterDone> {}

export const RegisterDoneScreen: FC<RegisterDoneScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()

  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  function handleRegisterDone() {
    setAuthToken(String(Date.now()))
  }

  return (
    <Screen
      preset="fixed"
      style={[themed($styles.container), themed($container)]}
      safeAreaEdges={["top"]}
    >
      <View style={themed($container)}>
        <Icon icon="like" size={50} />
        <Text preset="heading" size="xl">
          All done!
        </Text>
        <Text preset="subheading" style={themed($subheading)} size="xxs">
          Nice, you have finished all the questions and now you can start enjoying your premium
          offers.
        </Text>
      </View>
      <Button style={themed($button)} onPress={handleRegisterDone}>
        Home
      </Button>
    </Screen>
  )
}

const $subheading: ThemedStyle<TextStyle> = () => ({
  color: "gray",
})

const $button: ThemedStyle<ViewStyle> = ({ colors }) => ({
  marginTop: "80%",
  backgroundColor: colors.palette.primary500,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  gap: 20,
  alignItems: "center",
  marginTop: 70,
})
