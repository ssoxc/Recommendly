import { useAppTheme } from "@/utils/useAppTheme"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "@/components/Text"
import { ThemedStyle } from "@/theme"
import { Button } from "../Button"

export function RecommendationCard() {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <Text>RecommendationCard</Text>
      <Button preset="filled" style={themed($button)} text="Start" textStyle={themed($buttonText)}>
        Start
      </Button>
    </View>
  )
}

const $button: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 83,
  height: 26,
  borderRadius: spacing.md,
  marginTop: "auto",
  alignSelf: "flex-end",
  backgroundColor: colors.palette.neutral800,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 12,
  color: colors.palette.neutral100,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  padding: spacing.md,
  backgroundColor: colors.palette.primary500,
  borderRadius: spacing.md,
  width: 200,
  height: 200,
})
