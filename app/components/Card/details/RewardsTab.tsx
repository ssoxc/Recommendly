import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { ActivityIndicator, Alert, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { observer } from "mobx-react-lite"
import { useStores } from "@/models"
import { useEffect } from "react"
import { Reward } from "@/models/Reward"

interface RewardsTabProps {
  onRewardPress: (reward: Reward) => void
}

export const RewardsTab = observer<RewardsTabProps>(({ onRewardPress }) => {
  const { themed } = useAppTheme()
  const { rewardStore, cardStore } = useStores()

  useEffect(() => {
    if (cardStore.card?.storeId) {
      rewardStore.fetchRewards(cardStore.card?.storeId ?? "")
    }
  }, [cardStore.card?.storeId, rewardStore])

  const getRewardBackgroundColor = (cost: number) => {
    if (cost <= 100) {
      return "#1C66D7"
    } else if (cost <= 200) {
      return "#1C66D7"
    } else if (cost <= 300) {
      return "#1C66D7"
    } else if (cost <= 400) {
      return "#1C66D7"
    }
    return "#E0E0E0"
  }

  const handleRewardPress = (reward: Reward) => {
    if (reward.cost > (cardStore.card?.points || -1)) {
      Alert.alert("You don't have enough points to redeem this reward.")
      return
    }
    onRewardPress(reward)
  }

  if (rewardStore.isLoading) {
    return <ActivityIndicator />
  }

  return (
    <View style={themed($cardDetailContentContainer)}>
      <Text size="xs" weight="semiBold">
        Choose from the following options.
      </Text>
      <View style={themed($rewardsContainer)}>
        {rewardStore.rewards.map((reward, index) => (
          <TouchableOpacity
            onPress={() => handleRewardPress(reward)}
            style={[
              themed($rewardItem),
              { backgroundColor: getRewardBackgroundColor(reward.cost) },
            ]}
            key={index}
          >
            <View style={themed($rewardItemContent)}>
              <View style={themed($rewardItemCostContainer)}>
                <Text size="xs" weight="semiBold">
                  {reward.cost}
                </Text>
              </View>
              <View>
                <Text size="xs" weight="semiBold">
                  {reward.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={themed($disclaimerContainer)}>
          <Text size="xxs" weight="light">
            To redeem a reward, show the one you want in-store and scan the QR code. Rewards can
            only be collected at the store and Punkto is not responsible for any misunderstandings
            with the store.
          </Text>
        </View>
      </View>
    </View>
  )
})

const $disclaimerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginBottom: spacing.md,
})

const $rewardItemCostContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xxs,
  borderRadius: spacing.xs,
  backgroundColor: "#1C66D7",
})

const $rewardItemContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
  alignItems: "center",
})

const $rewardItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  borderRadius: spacing.md,
  backgroundColor: "white",
  marginBottom: spacing.md,
})

const $cardDetailContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $rewardsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
