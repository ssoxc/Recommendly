import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, ViewStyle } from "react-native"
import { Text } from "../../../components"

export const RewardsTab = () => {
  const { themed } = useAppTheme()

  const mockRewards = [
    {
      cost: 10,
      name: "One random item to collect",
      color: "#00FC2E",
    },
    {
      cost: 50,
      name: "One random item to collect",
      color: "#00FC2E",
    },
    {
      cost: 200,
      name: "One random item to collect",
      color: "#00FC2E",
    },
    {
      cost: 250,
      name: "One random item to collect",
      color: "#00FC2E",
    },
    {
      cost: 500,
      name: "One random item to collect",
      color: "#D9D9D9",
    },
    {
      cost: 1000,
      name: "One random item to collect",
      color: "#D9D9D9",
    },
    {
      cost: 3000,
      name: "One random item to collect",
      color: "#D9D9D9",
    },
    {
      cost: 10000,
      name: "One random item to collect",
      color: "#D9D9D9",
    },
  ]

  return (
    <View style={themed($cardDetailContentContainer)}>
      <Text size="xs" weight="semiBold">
        Choose from the following options.
      </Text>
      <View style={themed($rewardsContainer)}>
        {mockRewards.map((reward, index) => (
          <View style={[themed($rewardItem), { backgroundColor: reward.color }]} key={index}>
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
          </View>
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
}

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
