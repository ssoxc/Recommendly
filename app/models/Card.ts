import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CardModel = types
  .model("Card", {
    id: types.identifier,
    name: types.string,
    image: types.string,
    points: types.number,
    companyLogo: types.string,
    storeName: types.string,
    storeId: types.string,
    maxPoints: types.number,
    rewardsAvailable: types.number,
    brandColor: types.string,
    pointsUntilNextReward: types.number,
  })
  .actions(withSetPropAction)
  .views((card) => ({
    get formattedPoints() {
      return card.points.toLocaleString()
    },
  }))

export interface Card extends Instance<typeof CardModel> {}
export interface CardSnapshotOut extends SnapshotOut<typeof CardModel> {}
export interface CardSnapshotIn extends SnapshotIn<typeof CardModel> {}
