import { View, ViewStyle } from "react-native"
import { SuggestionCard } from "./SuggestionCard"
import { faker } from "@faker-js/faker/."

const mockData = [
  {
    id: "1",
    title: faker.company.name(),
    description: "Get 20% on your next purchase! Don't miss out on this limited-time offer.",
    discount: "-20 %",
    logo: "https://picsum.photos/200/300",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    title: faker.company.name(),
    description: "Get 10% off select items! Shop now and save on your favorites.",
    discount: "-10 %",
    logo: "https://picsum.photos/200/300",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "3",
    title: faker.company.name(),
    description:
      "Enjoy 15% off your first purchase! Whether you're shopping for yourself or treating yourself to something special...",
    discount: "-15 %",
    logo: "https://picsum.photos/200/300",
    image: "https://picsum.photos/200/300",
  },
]

export const SuggestionList = () => {
  return (
    <View style={$container}>
      {mockData.map((item) => (
        <SuggestionCard
          logo="https://picsum.photos/200/300"
          key={item.id}
          title={item.title}
          description={item.description}
          distance={item.discount}
          image={item.image}
          onPress={() => console.log(`Pressed ${item.title}`)}
        />
      ))}
    </View>
  )
}

const $container: ViewStyle = {}
