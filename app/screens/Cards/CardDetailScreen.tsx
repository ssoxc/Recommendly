import { AppStackScreenProps } from "@/navigators"
import { RouteNames } from "@/navigators/RouteNames"
import { FC, useEffect, useState } from "react"
import { Screen, Text } from "../../components"
import { $styles, ThemedStyle } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
import { Card } from "@/components/Card/Card"
import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { RewardsTab } from "@/components/Card/details/RewardsTab"
import { InfoTab } from "@/components/Card/details/InfoTab"

export const CardDetailScreen: FC<AppStackScreenProps<RouteNames.CardDetails>> = ({
  navigation,
  route,
}) => {
  const { cardStore } = useStores()
  const { cardId } = route.params
  const { themed } = useAppTheme()

  const [selectedTab, setSelectedTab] = useState<"rewards" | "infos">("rewards")

  useEffect(() => {
    cardStore.fetchCard(cardId)
  }, [cardId, cardStore])

  useHeader({
    title: cardStore.card?.name ?? "Card Detail",
    leftIcon: "back",
    onLeftPress: () => {
      navigation.goBack()
    },
  })

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Card
        companyLogo={cardStore.card?.companyLogo ?? ""}
        storeName={cardStore.card?.storeName ?? ""}
        points={cardStore.card?.points ?? 0}
        maxPoints={cardStore.card?.maxPoints ?? 0}
        rewardsAvailable={cardStore.card?.rewardsAvailable ?? 0}
        brandColor={cardStore.card?.brandColor ?? ""}
      />
      <View style={themed($cardDetailContainer)}>
        <Pressable onPress={() => setSelectedTab("rewards")}>
          <Text
            size="xs"
            weight="light"
            style={
              selectedTab === "rewards"
                ? themed($cardDetailTitle)
                : themed($cardDetailTitleInactive)
            }
          >
            Rewards
          </Text>
        </Pressable>
        <Pressable onPress={() => setSelectedTab("infos")}>
          <Text
            size="xs"
            weight="light"
            style={
              selectedTab === "infos" ? themed($cardDetailTitle) : themed($cardDetailTitleInactive)
            }
          >
            Infos
          </Text>
        </Pressable>
      </View>
      {selectedTab === "rewards" && <RewardsTab />}
      {selectedTab === "infos" && <InfoTab />}
    </Screen>
  )
}

const $cardDetailTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $cardDetailTitleInactive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent300,
})

const $cardDetailContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  flexDirection: "row",
  gap: spacing.sm,
})
