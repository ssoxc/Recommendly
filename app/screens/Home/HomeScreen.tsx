import { FC } from "react"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { $styles, ThemedStyle } from "../../theme"
import { MainTabScreenProps } from "../../navigators/MainNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { CardList } from "@/components/Card/CardList"
import { RecommendationList } from "@/components/Recommendation/RecommendationList"
import { RouteNames } from "@/navigators/RouteNames"
import { SupportCard } from "@/components/SupportCard"
import { observer } from "mobx-react-lite"
import { CardSnapshotIn } from "@/models/Card"
import { useRoute } from "@react-navigation/native"

export const HomeScreen: FC<MainTabScreenProps<RouteNames.Home>> = observer(
  function HomeScreen(_props) {
    const { themed } = useAppTheme()
    const route = useRoute()

    const handleCardUpdate = () => {
      console.log(route, "id")
    }

    return (
      <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
        <Text weight="semiBold" size="xl" style={themed($heading)}>
          Home
        </Text>
        <View>
          <Text size="sm" weight="semiBold" style={themed($yourCards)}>
            Your cards
          </Text>
          <CardList onCardUpdate={handleCardUpdate} />
          <Pressable
            onPress={() => {
              console.log("dasnfoinfiosdf")
              _props.navigation.navigate(RouteNames.AllCards)
            }}
          >
            <Text size="xs" weight="semiBold" style={themed($openAllCards)}>
              Open all cards
            </Text>
          </Pressable>
        </View>
        <View>
          <Text size="sm" weight="semiBold" style={themed($recommandations)}>
            Recommandations
          </Text>
          <RecommendationList />
        </View>
        <View style={themed($supportContainer)}>
          <Text size="sm" weight="semiBold" style={themed($support)}>
            Support
          </Text>
          <View style={themed($supportCards)}>
            <SupportCard
              onPress={() => {}}
              title="Looking for help?"
              subtitle="Send us an email."
            />
            <SupportCard
              onPress={() => {}}
              title="Can't find your fave spot?"
              subtitle="Suggest it now!"
            />
          </View>
        </View>
      </Screen>
    )
  },
)

const $support: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  marginTop: spacing.md,
})

const $supportContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $supportCards: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $yourCards: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
  marginTop: spacing.md,
})

const $recommandations: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.md,
})

const $openAllCards: ThemedStyle<TextStyle> = ({ colors }) => ({
  alignSelf: "center",
  color: colors.link,
})
