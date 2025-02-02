import { Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Icon, IconTypes, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

interface MenuItemProps {
  title: string
  leftIcon?: IconTypes
  onPress: () => void
}

export const MenuItem = ({ title, leftIcon, onPress }: MenuItemProps) => {
  const { themed } = useAppTheme()

  return (
    <>
      <Pressable onPress={onPress} style={themed($container)}>
        <View style={themed($leftIconContainer)}>
          {leftIcon && <Icon icon={leftIcon} size={20} color="black" />}
          <Text size="xs" weight="semiBold" style={themed($title)}>
            {title}
          </Text>
        </View>
        <Icon icon={"caretRight"} size={20} color="black" />
      </Pressable>
      <View style={themed($divider)} />
    </>
  )
}

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
})

const $leftIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
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
