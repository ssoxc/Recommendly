import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { View, ViewStyle } from "react-native"
import { Text, Button } from "../../../components"
import { MenuItem } from "@/components/Profile/MenuItem"

export const InfoTab = () => {
  const { themed } = useAppTheme()

  const storeInfo = {
    name: "Nike outlet store",
    address: "123 Main St, Anytown, USA",
    openingHours: "Mo-Fr 11:00 - 19:00, Sa 10:00 - 18:00, Su 10:00 - 17:00",
    phone: "123-456-7890",
  }

  return (
    <View style={themed($infoContainer)}>
      <Text size="md" weight="semiBold">
        {storeInfo.name}
      </Text>
      <MenuItem leftIcon="pin" title={storeInfo.address} onPress={() => {}} />
      <MenuItem
        leftIcon="clock"
        title={storeInfo.openingHours.split(",").join("\n")}
        onPress={() => {}}
      />
      <MenuItem leftIcon="phone" title={storeInfo.phone} onPress={() => {}} />
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} preset="filled" tx="Delete this card" onPress={() => {}} />
        <Text size="xxs" weight="light">
          This action cannot be undone. If you delete this card, the points you’ve collected will be
          lost, and Punkto won’t be able to recover them..
        </Text>
      </View>
    </View>
  )
}

const $button: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "red",
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: "40%",
  gap: spacing.xs,
})

const $infoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
})
