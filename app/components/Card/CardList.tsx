import { Pressable, View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Card } from "./Card"
import { useStores } from "@/models"
import { CardSnapshotIn } from "@/models/Card"
import { useEffect } from "react"

export interface ICardListProps {
  style?: ViewStyle
  containerStyle?: ViewStyle
  onCardPress?: (card: CardSnapshotIn) => void
  cards?: CardSnapshotIn[]
}
export function CardList(_props: ICardListProps) {
  const { themed } = useAppTheme()
  const { cardStore } = useStores()

  useEffect(() => {
    cardStore.fetchCards()
  }, [])

  return (
    <View style={_props.containerStyle ?? themed($container)}>
      {[...(_props.cards || cardStore.cards)].map((card, index) => (
        <View
          key={index}
          style={
            _props.style ?? [
              themed($cardWrapper),
              {
                zIndex: index,
                top: index * 50, // Add offset for each card
              },
            ]
          }
        >
          <Pressable onPress={() => _props.onCardPress?.(card)}>
            <Card {...card} />
          </Pressable>
        </View>
      ))}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  borderRadius: 15,
  position: "relative",
  height: 270, // Increased to accommodate stacked cards
})

const $cardWrapper: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  left: 0,
  right: 0,
})
