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
import { TipsScreen } from "@/screens/Tips/TipsScreen"
import { QrScreen } from "@/screens/QR/QrScreen"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { StoresScreen } from "@/screens/Stores/StoresScreen"
import { ProfileScreen } from "@/screens/Profile/ProfileScreen"

export type MainTabParamList = {
  Home: undefined
  Tips: undefined
  QR: undefined
  Stores: undefined
  Profile: undefined
}

export type RootStackParamList = {
  TabNavigator: undefined
  QRModal: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator<MainTabParamList>()

function TabNavigator() {
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
        component={TipsScreen}
        options={{
          tabBarLabel: translate("mainNavigator:tipsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="tips" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.QR}
        component={QrScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate(RouteNames.QRModal)
          },
        })}
        options={{
          tabBarLabel: translate("mainNavigator:qrTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="qr" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Stores}
        component={StoresScreen}
        options={{
          tabBarLabel: translate("mainNavigator:storesTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="stores" color={focused ? colors.tint : colors.tintInactive} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteNames.Profile}
        component={ProfileScreen}
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

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="QRModal"
        component={QrScreen}
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
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
