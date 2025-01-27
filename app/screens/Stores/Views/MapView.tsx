import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Dimensions, View, ViewStyle } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { useRef, useEffect } from "react"

// Mock data for store locations
const mockStores = [
  {
    id: 1,
    name: "Munich Store",
    coordinate: {
      latitude: 48.1351,
      longitude: 11.582,
    },
  },
  {
    id: 2,
    name: "Stuttgart Store",
    coordinate: {
      latitude: 48.7758,
      longitude: 9.1829,
    },
  },
  {
    id: 3,
    name: "Nuremberg Store",
    coordinate: {
      latitude: 49.4521,
      longitude: 11.0767,
    },
  },
  {
    id: 4,
    name: "Frankfurt Store",
    coordinate: {
      latitude: 50.1109,
      longitude: 8.6821,
    },
  },
]

const $mapStyle = [
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#E5E7EB" }],
  },
]

export const StoresMapView = () => {
  const mapRef = useRef<MapView>(null)

  // Fit map to show all markers with padding
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        mockStores.map((store) => store.coordinate),
        {
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
          animated: true,
        },
      )
    }
  }, [])

  const { themed } = useAppTheme()

  const initialRegion = {
    latitude: 49.0,
    longitude: 10.0,
    latitudeDelta: 4.0,
    longitudeDelta: 4.0,
  }

  return (
    <View style={$container}>
      <MapView
        ref={mapRef}
        style={themed($map)}
        initialRegion={initialRegion}
        customMapStyle={$mapStyle}
      >
        {mockStores.map((store) => (
          <Marker key={store.id} coordinate={store.coordinate} title={store.name}>
            <View style={themed($markerContainer)}>
              <View style={themed($marker)} />
              <View style={themed($whiteDot)} />
              <View style={themed($markerTail)} />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const $whiteDot: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 7,
  left: 7,
  zIndex: 100,
  width: 10,
  height: 10,
  borderRadius: 4,
  backgroundColor: "white",
})

const $markerContainer: ThemedStyle<ViewStyle> = () => ({
  width: 24,
  height: 32,
  alignItems: "center",
  position: "relative",
})

const $marker: ThemedStyle<ViewStyle> = () => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#3B82F6",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
})

const $markerTail: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: 0,
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  borderStyle: "solid",
  borderLeftWidth: 12,
  borderRightWidth: 12,
  borderTopWidth: 17,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderTopColor: "#3B82F6",
  transform: [{ translateY: 0 }],
})

// Remove $markerCenter as it's no longer needed

const $container = {
  flex: 1,
}

const $map: ThemedStyle<ViewStyle> = () => ({
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
  marginLeft: -25,
})
