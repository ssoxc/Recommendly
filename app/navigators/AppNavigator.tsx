/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { useStores } from "../models"
import { DemoTabParamList } from "./DemoNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"
import { RouteNames } from "./RouteNames"
import { MainNavigator, MainTabParamList } from "./MainNavigator"
import { RegisterScreen } from "@/screens/Register/RegisterScreen"
import { RegisterOneLastStepScreen } from "@/screens/Register/RegisterOneLastStepScreen"
import { RegisterInterestsScreen } from "@/screens/Register/RegisterInterestsScreen"
import { RegisterDoneScreen } from "@/screens/Register/RegisterDone"
import React from "react"
import { Reward } from "@/models/Reward"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  [RouteNames.Welcome]: undefined
  [RouteNames.EnterEmail]: undefined
  [RouteNames.EnterPassword]: undefined
  [RouteNames.Register]: undefined
  [RouteNames.Demo]: NavigatorScreenParams<DemoTabParamList>
  [RouteNames.Main]: NavigatorScreenParams<MainTabParamList>
  [RouteNames.RegisterOneLastStep]: undefined
  [RouteNames.RegisterInterests]: undefined
  [RouteNames.RegisterDone]: undefined
  [RouteNames.AllCards]: undefined
  [RouteNames.CardDetails]: { cardId: string }
  [RouteNames.QRModal]: NavigatorScreenParams<{ reward?: Reward }>
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated, isFirstStartup },
  } = useStores()

  const {
    theme: { colors },
  } = useAppTheme()

  const getInitialRoute = () => {
    if (isFirstStartup) {
      return RouteNames.Welcome
    } else if (isAuthenticated) {
      return RouteNames.EnterEmail
    }
    return RouteNames.Main
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={getInitialRoute()}
    >
      {isAuthenticated ? (
        <React.Fragment>
          <Stack.Screen name={RouteNames.Main} component={MainNavigator} />
        </React.Fragment>
      ) : (
        <>
          <Stack.Screen name={RouteNames.Welcome} component={Screens.WelcomeScreen} />
          <Stack.Screen name={RouteNames.Register} component={RegisterScreen} />
          <Stack.Screen name={RouteNames.RegisterInterests} component={RegisterInterestsScreen} />
          <Stack.Screen
            name={RouteNames.RegisterOneLastStep}
            component={RegisterOneLastStepScreen}
          />
          <Stack.Screen name={RouteNames.RegisterDone} component={RegisterDoneScreen} />
          <Stack.Screen name={RouteNames.EnterEmail} component={Screens.EnterEmailScreen} />
          <Stack.Screen name={RouteNames.EnterPassword} component={Screens.EnterPasswordScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
})

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
})
