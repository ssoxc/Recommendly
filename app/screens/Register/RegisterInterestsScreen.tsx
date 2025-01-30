import { FC, useState } from "react"
import { Button, Icon, Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { RouteNames } from "@/navigators/RouteNames"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

interface RegisterInterestsScreenProps extends AppStackScreenProps<RouteNames.RegisterInterests> {}

interface IBubble {
  id: string
  name: string
}

const bubbles: IBubble[] = [
  { id: "1", name: "Fitness" },
  { id: "2", name: "Travel" },
  { id: "3", name: "Food" },
  { id: "4", name: "Tech" },
  { id: "5", name: "Fashion" },
  { id: "6", name: "Music" },
  { id: "7", name: "Art" },
  { id: "8", name: "Books" },
  { id: "9", name: "Movies" },
]

export const RegisterInterestsScreen: FC<RegisterInterestsScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme()
  const [selectedBubbles, setSelectedBubbles] = useState<IBubble[]>([])
  const [step, setStep] = useState(1)

  useHeader({
    titleTx: "Super",
    leftIcon: "back",
    onLeftPress: () => navigation.goBack(),
  })

  const handleBubblePress = (bubble: IBubble) => {
    if (selectedBubbles.includes(bubble)) {
      setSelectedBubbles((prev) => prev.filter((b) => b.id !== bubble.id))
    } else if (selectedBubbles.length >= 5) {
      return
    } else {
      setSelectedBubbles((prev) => [...prev, bubble])
    }
  }

  const isBubbleSelected = (bubble: IBubble) => selectedBubbles.includes(bubble)

  const handleNextPress = () => {
    if (step === 3) {
      navigation.navigate(RouteNames.RegisterDone)
    } else {
      setStep(step + 1)
    }
  }

  return (
    <Screen preset="fixed" style={themed($styles.container)}>
      <View style={themed($container)}>
        <Icon icon="like" size={50} />
        <Text style={themed($title)} preset="heading" size="sm">
          Click on the bubbles you find interesting
        </Text>
        <Text style={themed($subtitle)} preset="subheading" size="xs" weight="light">
          Select up to 5
        </Text>
      </View>
      <View style={themed($bubblesContainer)}>
        {bubbles.map((bubble) => (
          <TouchableOpacity
            onPress={() => handleBubblePress(bubble)}
            style={isBubbleSelected(bubble) ? themed($bubbleSelected) : themed($bubble)}
            key={bubble.id}
          >
            <Text>{bubble.name}</Text>
          </TouchableOpacity>
        ))}
        <Text style={themed($bubbleCounter)}>{selectedBubbles.length} / 5</Text>
      </View>
      <View style={themed($footer)}>
        <Text style={themed($subtitle)} preset="subheading" size="xs" weight="light">
          Finish the 3 steps to get started
        </Text>
        <Button style={themed($nextButton)} tx="common:next" onPress={handleNextPress} />
        <Text style={themed($stepCounter)} preset="subheading" size="xs" weight="light">
          {step} / 3
        </Text>
      </View>
    </Screen>
  )
}

const $bubbleCounter: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral400,
  alignSelf: "flex-end",
  alignContent: "flex-end",
  justifyContent: "flex-end",
})

const $stepCounter: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral400,
})

const $nextButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "100%",
  backgroundColor: colors.palette.neutral500,
})

const $footer: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
  marginTop: "8%",
})

const $bubblesContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: "8%",
  gap: 15,
  justifyContent: "flex-end",
})

const $bubbleSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 100,
  borderRadius: 25,
})

const $bubble: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral300,
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 100,
  borderRadius: 25,
})

const $subtitle: ThemedStyle<TextStyle> = () => ({
  color: "black",
  marginTop: 5,
})

const $title: ThemedStyle<TextStyle> = () => ({
  color: "black",
  marginTop: 10,
})

const $container: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
})
