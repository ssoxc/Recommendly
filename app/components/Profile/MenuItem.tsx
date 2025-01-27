import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

interface MenuItemProps {
  title: string
  onPress: () => void
}

export const MenuItem = ({ title, onPress }: MenuItemProps) => {
  const { themed } = useAppTheme()

  return (
    <>
      <Pressable onPress={onPress} style={themed($container)}>
        <Text size="xs" weight="semiBold" style={themed($title)}>
          {title}
        </Text>
        <Icon icon={"caretRight"} size={20} color="black" />
      </Pressable>
      <View style={themed($divider)} />
    </>
  )
}

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.xs,
})

const $divider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 1,
  backgroundColor: colors.palette.neutral400,
})
