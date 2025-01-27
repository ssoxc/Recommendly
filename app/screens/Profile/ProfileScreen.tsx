import { TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { Screen, Text } from "../../components"
import { $styles, ThemedStyle } from "../../theme"
import { MainTabScreenProps } from "@/navigators/MainNavigator"
import { RouteNames } from "@/navigators/RouteNames"
import { useAppTheme } from "@/utils/useAppTheme"
import { FC } from "react"
import { MenuCard } from "@/components/Profile/MenuCard"
import { MenuItem } from "@/components/Profile/MenuItem"

export const ProfileScreen: FC<MainTabScreenProps<RouteNames.Profile>> = function ProfileScreen(
  _props,
) {
  const { themed } = useAppTheme()

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text weight="semiBold" size="xl" style={themed($heading)}>
        Profile
      </Text>
      <View style={themed($container)}>
        <Image source={{ uri: "https://picsum.photos/200/300" }} style={themed($image)} />
        <Text size="xxs" style={themed($name)}>
          random.email.address@gmail.com
        </Text>
      </View>
      <View style={themed($menuContainer)}>
        <MenuCard title="Transaction History" icon={"clock"} onPress={() => {}} />
        <MenuCard title="Account" icon={"user"} onPress={() => {}} />
        <MenuCard title="Maybe something idk" icon={"user"} onPress={() => {}} />
        <MenuCard title="Maybe something idk" icon={"user"} onPress={() => {}} />
      </View>
      <View style={themed($menuItemsContainer)}>
        <MenuItem title="Contact" onPress={() => {}} />
        <MenuItem title="FAQ" onPress={() => {}} />
        <MenuItem title="Terms of use" onPress={() => {}} />
        <MenuItem title="Data Protection" onPress={() => {}} />
      </View>
    </Screen>
  )
}

const $menuContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
  marginTop: spacing.xl,
  flexDirection: "row",
  flexWrap: "wrap",
})

const $menuItemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
  marginTop: spacing.xl,
})

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral500,
})

const $image: ThemedStyle<ImageStyle> = () => ({
  width: 80,
  height: 80,
  borderRadius: 80,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  gap: spacing.xs,
  alignItems: "center",
  marginTop: spacing.md,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
