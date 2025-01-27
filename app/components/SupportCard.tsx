import { Pressable, View, ViewStyle } from "react-native"
import { Text } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface SupportCardProps {
  onPress: () => void
  title: string
  subtitle: string
}

export const SupportCard = ({ onPress, title, subtitle }: SupportCardProps) => {
  const { themed } = useAppTheme()

  return (
    <Pressable onPress={onPress}>
      <View style={themed($container)}>
        <Text size="lg" weight="semiBold">
          {title}
        </Text>
        <Text size="sm">{subtitle}</Text>
      </View>
    </Pressable>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral300,
  height: 100,
  borderRadius: 15,
  padding: 15,
})
