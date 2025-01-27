import { ScrollView, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { RecommendationCard } from "./RecommendationCard"

export function RecommendationList() {
  const { themed } = useAppTheme()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={themed($contentContainer)}
    >
      <RecommendationCard />
      <RecommendationCard />
      <RecommendationCard />
    </ScrollView>
  )
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xl,
})
