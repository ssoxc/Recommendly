import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const RewardModel = types.model("Reward", {
  id: types.identifier,
  name: types.string,
  description: types.string,
  cost: types.number,
  redeemCount: types.number,
  image: types.string,
  expiryDate: types.string,
  storeId: types.string,
})

export interface Reward extends Instance<typeof RewardModel> {}
export interface RewardSnapshotIn extends SnapshotIn<typeof RewardModel> {}
export interface RewardSnapshotOut extends SnapshotOut<typeof RewardModel> {}
