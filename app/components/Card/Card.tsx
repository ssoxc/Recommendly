import { View, Image, ViewStyle, ImageStyle, TextStyle } from "react-native"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type CardProps = {
  companyLogo: string
  storeName: string
  points: number
  maxPoints: number
  rewardsAvailable: number
  brandColor: string
  pointsUntilNextReward: number
}

export function Card({
  companyLogo,
  storeName,
  points,
  maxPoints,
  rewardsAvailable,
  brandColor,
  pointsUntilNextReward,
}: CardProps) {
  const { themed } = useAppTheme()

  const progressWidth = (points / maxPoints) * 100

  return (
    <View style={[themed($cardContainer), { backgroundColor: brandColor }]}>
      <View style={themed($header)}>
        <View style={themed($headerLeft)}>
          <Image source={{ uri: companyLogo }} style={themed($smallLogo)} />
          <View style={themed($headerLeftRight)}>
            <Text size="xxs" style={themed($storeName)}>
              {storeName.length > 20 ? `${storeName.slice(0, 20)}...` : storeName}
            </Text>
            <Text size="sm" weight="semiBold" style={themed($points)}>
              {points} P
            </Text>
          </View>
        </View>
        <View style={themed($headerRight)}>
          <Text size="xs" weight="semiBold" style={themed($rewardsAvailable)}>
            {rewardsAvailable > 0 ? `${rewardsAvailable} rewards available.` : "No rewards yet"}
          </Text>
          <Image source={{ uri: companyLogo }} style={themed($largeLogo)} />
        </View>
      </View>

      {pointsUntilNextReward > 0 && (
        <View style={themed($bottomContainer)}>
          <View style={themed($upcomingRewardContainer)}>
            <Text size="xxs" style={themed($upcomingReward)}>
              Upcoming Reward
            </Text>
            <Text size="xxs" style={themed($upcomingReward)}>
              + {pointsUntilNextReward} P
            </Text>
          </View>
          <View style={themed($progressContainer)}>
            <View style={[themed($progressBar), { width: `${progressWidth}%` }]} />
          </View>
        </View>
      )}
      {pointsUntilNextReward <= 0 && (
        <View style={themed($bottomContainer)}>
          <Text size="xxs" style={themed($upcomingReward)}>
            No upcoming reward
          </Text>
        </View>
      )}
    </View>
  )
}

const $upcomingRewardContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "column",
  gap: spacing.xxs,
})

const $upcomingReward: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $headerRight: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  alignItems: "flex-end",
})

const $headerLeftRight: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  alignItems: "flex-start",
  maxWidth: 150,
})

const $headerLeft: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  alignItems: "flex-start",
})

const $rewardsAvailable: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $cardContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  backgroundColor: "rgba(180, 140, 76, 1)",
  borderRadius: 15,
  shadowColor: colors.palette.neutral200,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  height: 165,
  width: 320,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: spacing.md,
})

const $smallLogo: ThemedStyle<ImageStyle> = () => ({
  width: 50,
  height: 50,
  borderRadius: 35,
  objectFit: "contain",
})

const $largeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 150,
  height: 54,
  alignSelf: "center",
  marginTop: spacing.md,
})

const $storeName: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.palette.neutral100,
})

const $points: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.palette.neutral100,
})

const $progressContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 8,
  backgroundColor: colors.border,
  borderRadius: 4,
  overflow: "hidden",
})

const $progressBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  backgroundColor: colors.palette.neutral100,
  borderRadius: 4,
})
