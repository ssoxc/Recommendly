import { HomeScreen } from "@/screens"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { RouteNames } from "./RouteNames"
import { translate } from "@/i18n"
import { Icon } from "@/components"
import { CompositeScreenProps, useRoute } from "@react-navigation/native"
import { TipsScreen } from "@/screens/Tips/TipsScreen"
import { QrScreen } from "@/screens/QR/QrScreen"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { StoresScreen } from "@/screens/Stores/StoresScreen"
import { ProfileScreen } from "@/screens/Profile/ProfileScreen"
import { AllCardsScreen } from "@/screens/Cards/AllCardScreen"
import { CardDetailScreen } from "@/screens/Cards/CardDetailScreen"
import { useStores } from "@/models"
import { useEffect } from "react"
import { setupRewardPointChannel, supabase } from "@/supabase/supabase"
import { FC } from "react"

export type MainTabParamList = {
  Home: undefined
  Tips: undefined
  QR: undefined
  QRModal: { rewardId?: string }
  Stores: undefined
  Profile: undefined
  AllCards: undefined
}

export type RootStackParamList = {
  TabNavigator: undefined
  RegisterStack: undefined
  QRModal: { rewardId?: string }
  CardDetails: { cardId: string }
  AllCards: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>

const Stack = createNativeStackNavigator<RootStackParamList>()
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

const QRModal: FC<NativeStackScreenProps<RootStackParamList, RouteNames.QRModal>> = (props) => {
  return <QrScreen {...props} />
}

export function MainNavigator() {
  const route = useRoute()
  const { cardStore } = useStores()

  useEffect(() => {
    const setupHandlers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (cardStore.cards.length === 0) {
        return
      }
      if (!user?.id) {
        return
      }
      console.log(user.id, "user.id")
      return setupRewardPointChannel(
        cardStore.cards.map((card) => card.id),
        user.id,
        (cardId, amount) => {
          console.log("cardId", cardId, "amount", amount)
          cardStore.updateCardPoints(cardId, amount)
        },
        (cardId) => {
          console.log("cardId is new card created", cardId)
          cardStore.addCard(cardId)
        },
      )
    }
    setupHandlers()
  }, [cardStore, route])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen
          name={RouteNames.QRModal}
          component={QRModal}
          options={() => ({
            headerShown: false,
            gestureEnabled: true,
          })}
        />
      </Stack.Group>
      <Stack.Screen name={RouteNames.AllCards} component={AllCardsScreen} />
      <Stack.Screen name={RouteNames.CardDetails} component={CardDetailScreen} />
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
