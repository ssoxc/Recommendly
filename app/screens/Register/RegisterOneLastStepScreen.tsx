import { Button, Icon } from "@/components"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Screen } from "app/components/Screen"
import { Text } from "app/components/Text"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { RouteNames } from "@/navigators/RouteNames"
import { useStores } from "@/models"

interface RegisterOneLastStepScreenProps
  extends AppStackScreenProps<RouteNames.RegisterOneLastStep> {}

export const RegisterOneLastStepScreen: FC<RegisterOneLastStepScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()

  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  const handleLaterPress = () => {
    setAuthToken(String(Date.now()))
    navigation.navigate(RouteNames.RegisterDone)
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      style={[themed($styles.container), themed($container)]}
    >
      <View style={themed($container)}>
        <Icon icon="smile" size={50} />
        <View style={themed($titleContainer)}>
          <Text weight="bold" preset="subheading" size="xl">
            One last step
          </Text>
          <Text preset="subheading" size="xxs">
            To ensure you never miss out on offers and discounts, we recommend answering the
            following questions.
          </Text>
        </View>
      </View>
      <View style={themed($buttonsContainer)}>
        <Button
          onPress={() => navigation.navigate(RouteNames.RegisterInterests)}
          style={themed($bestOffersButton)}
          tx="oneLastStepScreen:bestOffers"
        />
        <Text
          onPress={handleLaterPress}
          preset="subheading"
          size="xs"
          tx="oneLastStepScreen:later"
          style={themed($laterButton)}
        />
      </View>
    </Screen>
  )
}

const $bestOffersButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral500,
  width: "100%",
})

const $buttonsContainer: ThemedStyle<ViewStyle> = () => ({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: "10%",
  alignItems: "center",
})

const $laterButton: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral400,
})

const $titleContainer: ThemedStyle<ViewStyle> = () => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  gap: 5,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  marginTop: "20%",
  gap: 20,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})
