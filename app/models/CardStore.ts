import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CardModel, CardSnapshotIn } from "./Card"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { supabase } from "@/supabase/supabase"

export const CardStoreModel = types
  .model("CardStore")
  .props({
    isLoading: false,
    cards: types.array(CardModel),
    card: types.maybe(types.reference(CardModel)),
    favorites: types.array(types.reference(CardModel)),
    favoritesOnly: false,
    isQrScreenVisible: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setQrScreenVisible(visible: boolean) {
      store.setProp("isQrScreenVisible", visible)
    },

    async fetchCards() {
      try {
        store.setProp("isLoading", true)
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          console.error("User not found")
          return
        }
        const response = await supabase.from("Card").select("*").eq("user_id", user.id)
        if (response.data) {
          const promises = response.data.map(async (card) => {
            return await this.fetchCard(card.id)
          }) as Promise<CardSnapshotIn>[]
          const cards = await Promise.all(promises)
          console.log(cards, "cards")
          store.setProp("cards", cards)
        }
      } catch (error) {
        console.error(`Error fetching cards: ${error}`)
        store.setProp("isLoading", false)
      } finally {
        store.setProp("isLoading", false)
      }
    },
    async fetchCard(cardId: string) {
      if (!cardId) {
        return null
      }
      const { data: cardData, error: cardError } = await supabase
        .from("Card")
        .select("*")
        .eq("id", cardId)
        .single()
      if (cardError || !cardData) {
        return null
      }
      const { data: storeData, error: storeError } = await supabase
        .from("Store")
        .select("*")
        .eq("id", cardData.store_id!)
        .single()
      const { data: pointsData, error: pointsError } = await supabase
        .from("RewardPoint")
        .select("*")
        .eq("id", cardData.points_id!)
        .single()
      if (pointsError || !pointsData) {
        return null
      }
      const { data: nextRewardData } = await supabase
        .from("ReademableReward")
        .select("*")
        .eq("store_id", cardData.store_id!)
        .gt("cost", pointsData.amount)
        .single()
      const { data: availableRewardsData, error: availableRewardsError } = await supabase
        .from("ReademableReward")
        .select("*")
        .eq("store_id", cardData.store_id!)
        .lt("cost", pointsData.amount)
      if (
        storeError ||
        !storeData ||
        pointsError ||
        !pointsData ||
        availableRewardsError ||
        !availableRewardsData
      ) {
        return null
      }
      return CardModel.create({
        id: cardData.id,
        name: cardData.name,
        image: storeData.logo ?? "",
        points: pointsData.amount,
        brandColor: storeData.color ?? "#000000",
        companyLogo: storeData.logo ?? "",
        storeName: storeData.name,
        maxPoints: nextRewardData?.cost || 0,
        rewardsAvailable: availableRewardsData.length,
        pointsUntilNextReward: nextRewardData?.cost ? nextRewardData.cost - pointsData.amount : 0,
        storeId: cardData.store_id ?? "",
      })
    },

    async updateCardPoints(cardId: string, amount: number) {
      const card = store.cards.find((x) => x.id === cardId)
      if (!card) {
        console.log("here?")
        return
      }
      card.points = amount
      card.pointsUntilNextReward = card.maxPoints - amount
      await this.fetchCard(cardId)
    },

    async addCard(cardId: string) {
      try {
        store.setProp("isLoading", true)
        const card = await this.fetchCard(cardId)
        if (!card) {
          store.setProp("isLoading", false)
          return
        }
        store.setProp("cards", [...store.cards, card])
      } catch (error) {
        console.error(`Error adding card: ${error}`)
      } finally {
        store.setProp("isLoading", false)
      }
    },

    setCard(card: Instance<typeof CardModel> | null) {
      if (!card) {
        store.setProp("card", undefined)
        return
      }
      store.setProp("card", card.id)
    },

    clearCard() {
      store.setProp("card", undefined)
    },
  }))

export interface CardStore extends Instance<typeof CardStoreModel> {}
export interface CardStoreSnapshot extends SnapshotOut<typeof CardStoreModel> {}
