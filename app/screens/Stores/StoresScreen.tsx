import { $styles, ThemedStyle } from "@/theme"
import { Screen, Text } from "../../components"
import { MainTabScreenProps } from "@/navigators/MainNavigator"
import { FC, useState } from "react"
import { RouteNames } from "@/navigators/RouteNames"
import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { ListView } from "./Views/ListView"
import { StoresMapView } from "./Views/MapView"
import { useAppTheme } from "@/utils/useAppTheme"
export const StoresScreen: FC<MainTabScreenProps<RouteNames.Stores>> = () => {
  const [selectedTab, setSelectedTab] = useState<"map" | "list">("map")
  const { themed } = useAppTheme()
  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text weight="semiBold" size="xl" style={themed($heading)}>
        Stores
      </Text>
      <View style={$tabContainer}>
        <TouchableOpacity
          style={[$tab, selectedTab === "map" && $selectedTab]}
          onPress={() => setSelectedTab("map")}
        >
          <Text style={[$tabText, selectedTab === "map" && $selectedTabText]}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[$tab, selectedTab === "list" && $selectedTab]}
          onPress={() => setSelectedTab("list")}
        >
          <Text style={[$tabText, selectedTab === "list" && $selectedTabText]}>List</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "map" ? <StoresMapView /> : <ListView />}
    </Screen>
  )
}

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $tabContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: 20,
  borderRadius: 8,
  backgroundColor: "#f0f0f0",
  padding: 4,
}

const $tab: ViewStyle = {
  flex: 1,
  paddingVertical: 8,
  alignItems: "center",
  borderRadius: 6,
}

const $selectedTab: ViewStyle = {
  backgroundColor: "white",
}

const $tabText: TextStyle = {
  fontSize: 16,
  color: "#666",
}

const $selectedTabText: TextStyle = {
  color: "#000",
  fontWeight: "600",
}
