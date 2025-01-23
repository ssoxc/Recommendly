import { FC } from "react"
import { TextStyle, View } from "react-native"
import { Screen, Text } from "../../components"
import { $styles, ThemedStyle } from "../../theme"
import { MainTabScreenProps } from "../../navigators/MainNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { CardList } from "@/components/Card/CardList"
import { RecommendationCard } from "@/components/Recommendation/RecommendationCard"

export const HomeScreen: FC<MainTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text weight="semiBold" size="xl" style={themed($heading)}>
        Home
      </Text>
      <View>
        <Text size="sm" weight="semiBold" style={themed($yourCards)}>
          Your cards
        </Text>
        <CardList
          title="Card 1"
          description="Card 1 description"
          image="https://picsum.photos/200/300"
        />
        <Text size="xs" weight="semiBold" style={themed($openAllCards)}>
          Open all cards
        </Text>
      </View>
      <View>
        <Text size="sm" weight="semiBold" style={themed($recommandations)}>
          Recommandations
        </Text>
        <RecommendationCard />
      </View>
    </Screen>
  )
}

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $yourCards: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
  marginTop: spacing.md,
})

const $recommandations: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $openAllCards: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  alignSelf: "center",
  color: colors.link,
})
