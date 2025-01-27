import { $styles, ThemedStyle } from "@/theme"
import { Screen, Text } from "../../components"
import { FC } from "react"
import { MainTabScreenProps } from "@/navigators/MainNavigator"
import { RouteNames } from "@/navigators/RouteNames"
import { TextStyle, View } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { SuggestionList } from "@/components/Suggestion/SuggestionList"

export const TipsScreen: FC<MainTabScreenProps<RouteNames.Tips>> = () => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text weight="semiBold" size="xl" style={themed($heading)}>
        Tips
      </Text>
      <View>
        <Text size="sm" weight="semiBold" style={themed($recommandations)}>
          Recommandations
        </Text>
        <SuggestionList />
      </View>
    </Screen>
  )
}

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $recommandations: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.md,
})
