import { RouteNames } from "@/navigators/RouteNames"
import { FC, useEffect, useState } from "react"
import { Screen, Text } from "../../components"
import { $styles, ThemedStyle } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
import { Card } from "@/components/Card/Card"
import { ActivityIndicator, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { RewardsTab } from "@/components/Card/details/RewardsTab"
import { InfoTab } from "@/components/Card/details/InfoTab"
import { observer } from "mobx-react-lite"
import { Reward } from "@/models/Reward"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigators/MainNavigator"

type Props = NativeStackScreenProps<RootStackParamList, RouteNames.CardDetails>

export const CardDetailScreen: FC<Props> = observer(({ navigation, route }) => {
  const { cardStore, rewardStore } = useStores()
  const { cardId } = route.params
  const { themed } = useAppTheme()

  const [selectedTab, setSelectedTab] = useState<"rewards" | "infos">("rewards")

  useEffect(() => {
    const card = cardStore.cards.find((card) => card.id === cardId)
    if (card) {
      cardStore.setCard(card)
    } else {
      cardStore.addCard(cardId)
    }
    rewardStore.fetchRewards(cardStore.card?.storeId ?? "")
  }, [cardId, cardStore, rewardStore])

  useHeader({
    title: cardStore.card?.name ?? "Card Detail",
    leftIcon: "back",
    onLeftPress: () => {
      navigation.goBack()
    },
  })

  const handleRewardPress = (reward: Reward) => {
    navigation.navigate(RouteNames.QRModal, { rewardId: reward.id })
  }

  if (rewardStore.isLoading) {
    return <ActivityIndicator />
  }

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container}>
      <Card
        pointsUntilNextReward={cardStore.card?.pointsUntilNextReward ?? 0}
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
      {selectedTab === "rewards" && (
        <RewardsTab onRewardPress={handleRewardPress} rewards={rewardStore.rewards} />
      )}
      {selectedTab === "infos" && <InfoTab />}
    </Screen>
  )
})

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
