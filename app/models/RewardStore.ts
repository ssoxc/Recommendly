import { types } from "mobx-state-tree"
import { RewardModel } from "./Reward"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { supabase } from "@/supabase/supabase"

export const RewardStoreModel = types
  .model("RewardStore", {
    rewards: types.array(RewardModel),
    isLoading: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchRewards(storeId: string) {
      try {
        store.setProp("isLoading", true)
        console.log(storeId, "storeId")
        const { data, error } = await supabase
          .from("ReademableReward")
          .select("*")
          .eq("store_id", storeId)

        if (error) {
          console.error(error)
          return
        }
        const rewards = data.map((reward) => {
          return RewardModel.create({
            id: reward.id,
            name: reward.name,
            description: reward.description,
            cost: reward.cost,
            redeemCount: reward.redeemedcount,
            image: reward.image ?? "",
            expiryDate: reward.expirydate,
            storeId: reward.store_id ?? "",
          })
        })
        store.setProp("rewards", rewards)
      } catch (error) {
        console.error(error)
      } finally {
        store.setProp("isLoading", false)
      }
    },
  }))
