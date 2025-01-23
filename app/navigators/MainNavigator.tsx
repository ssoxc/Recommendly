import { HomeScreen } from "@/screens"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RouteNames } from "./RouteNames"
import { translate } from "@/i18n"
import { Icon } from "@/components"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "."

export type MainTabParamList = {
  Home: undefined
  Tips: undefined
  QR: undefined
  Stores: undefined
  Profile: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >
      <Tab.Screen
        name={RouteNames.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: translate("mainNavigator:homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Tips}
        component={HomeScreen}
        options={{
          tabBarLabel: translate("mainNavigator:tipsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="tips" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.QR}
        component={HomeScreen}
        options={{
          tabBarLabel: translate("mainNavigator:qrTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="qr" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Stores}
        component={HomeScreen}
        options={{
          tabBarLabel: translate("mainNavigator:storesTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="stores" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Profile}
        component={HomeScreen}
        options={{
          tabBarLabel: translate("mainNavigator:profileTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="profile" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  color: colors.text,
})
