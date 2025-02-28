import { FC } from "react"
import { Screen } from "../../components"
import { ViewStyle } from "react-native"
import { RouteNames } from "../../navigators/RouteNames"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { CardList } from "@/components/Card/CardList"
import { AppStackScreenProps } from "@/navigators"
import { useStores } from "@/models"

export const AllCardsScreen: FC<AppStackScreenProps<RouteNames.AllCards>> = ({ navigation }) => {
  const { themed } = useAppTheme()
  const { cardStore } = useStores()

  useHeader({
    title: "Cards",
    leftIcon: "back",
    onLeftPress: () => {
      navigation.goBack()
    },
  })

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <CardList
        cards={cardStore.cards}
        onCardPress={(card) => {
          navigation.navigate(RouteNames.CardDetails, { cardId: card.id })
        }}
        style={themed($cardList)}
      />
    </Screen>
  )
}

const $cardList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
})
