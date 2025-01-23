import { View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

type CardListProps = {
  title: string
  description: string
  image: string
}

export function CardList(_props?: CardListProps) {
  const { themed } = useAppTheme()
  return (
    <View style={themed($container)}>
      <Text>Cards</Text>
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  height: 320,
  width: 320,
  borderRadius: 15,
  backgroundColor: "red",
})
