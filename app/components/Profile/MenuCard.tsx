import { Pressable, TextStyle, ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { Icon, IconTypes, Text } from "@/components"
import { ThemedStyle } from "@/theme"

type MenuCardProps = {
  title: string
  icon: IconTypes
  onPress: () => void
}

export const MenuCard = ({ title, icon, onPress }: MenuCardProps) => {
  const { themed } = useAppTheme()

  return (
    <Pressable onPress={onPress} style={themed($container)}>
      <Icon icon={icon} size={20} color="black" />
      <Text style={themed($title)} size="xxs" weight="semiBold">
        {title}
      </Text>
    </Pressable>
  )
}

const $title: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral400,
  height: 75,
  paddingTop: spacing.md,
  paddingBottom: spacing.xs,
  paddingLeft: spacing.md,
  paddingRight: spacing.md,
  width: 160,
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderRadius: 10,
})
