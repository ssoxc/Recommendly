import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CardModel } from "./Card"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "@/services/api"

export const CardStoreModel = types
  .model("CardStore")
  .props({
    cards: types.array(CardModel),
    card: types.maybe(CardModel),
    favorites: types.array(types.reference(CardModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCards() {
      const response = await api.getCards()
      if (response.kind === "ok") {
        store.setProp("cards", response.cards)
      } else {
        console.error(`Error fetching cards: ${JSON.stringify(response)}`)
      }
    },
    async fetchCard(cardId: string) {
      const response = await api.getCard(cardId)
      if (response.kind === "ok") {
        store.setProp("card", response.card)
      } else {
        console.error(`Error fetching card: ${JSON.stringify(response)}`)
      }
    },
  }))

export interface CardStore extends Instance<typeof CardStoreModel> {}
export interface CardStoreSnapshot extends SnapshotOut<typeof CardStoreModel> {}
