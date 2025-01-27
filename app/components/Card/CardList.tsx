import { View, ViewStyle } from "react-native"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Card } from "./Card"
import { faker } from "@faker-js/faker"

export function CardList() {
  const { themed } = useAppTheme()
  const mockColors = ["rgba(26, 52, 63, 1)", "rgba(142, 173, 187, 1)", "rgba(180, 140, 76, 1)"]
  // Mock data
  const mockCard = Array.from({ length: 3 }, (_, index) => ({
    companyLogo: faker.image.url(),
    storeName: faker.company.name(),
    points: faker.number.int({ min: 100, max: 1000 }),
    maxPoints: faker.number.int({ min: 1000, max: 10000 }),
    rewardsAvailable: faker.number.int({ min: 1, max: 10 }),
    brandColor: mockColors[index % mockColors.length],
  }))

  return (
    <View style={themed($container)}>
      {mockCard.map((card, index) => (
        <View
          key={index}
          style={[
            themed($cardWrapper),
            {
              zIndex: index,
              top: index * 50, // Add offset for each card
            },
          ]}
        >
          <Card {...card} />
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
