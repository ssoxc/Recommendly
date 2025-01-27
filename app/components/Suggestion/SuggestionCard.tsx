import { Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../Text"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export interface SuggestionProps {
  title: string
  description: string
  distance: string
  image: string
  logo: string
  onPress?: () => void
}

export const SuggestionCard = ({
  title,
  description,
  distance,
  image,
  onPress,
  logo,
}: SuggestionProps) => {
  const { themed } = useAppTheme()

  return (
    <Pressable onPress={onPress} style={themed($container)}>
      <View style={$discountContainer}>
        <Text weight="semiBold" size="xs" style={themed($discount)}>
          {distance}
        </Text>
      </View>
      <Image source={{ uri: image }} style={$image} />
      <View style={themed($contentContainer)}>
        <View style={$styles.row}>
          <Image source={{ uri: logo }} style={themed($logo)} />
          <View style={themed($titleContainer)}>
            <Text weight="semiBold" size="xs" style={themed($title)}>
              {title}
            </Text>
            <Text size="xxs" style={themed($description)}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const $titleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.xs,
  flex: 1,
})

const $logo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 45,
  height: 45,
  resizeMode: "cover",
  borderRadius: spacing.xl,
  marginRight: spacing.xs,
})

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  borderRadius: spacing.sm,
  marginVertical: spacing.xs,
  overflow: "hidden",
  shadowColor: "red",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  height: 210,
})

const $image: ImageStyle = {
  width: "100%",
  height: 120,
  resizeMode: "cover",
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  flex: 1,
})

const $discountContainer: ViewStyle = {
  position: "absolute",
  right: 12,
  zIndex: 2,
  top: 10,
  backgroundColor: "#000",
  borderRadius: 4,
  padding: 4,
}

const $discount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.background,
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $description: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
