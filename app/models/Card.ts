import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CardModel = types
  .model("Card", {
    id: types.identifier,
    name: types.string,
    description: types.string,
    image: types.string,
    points: types.number,
    createdAt: types.string,
    updatedAt: types.string,
    companyLogo: types.string,
    storeName: types.string,
    maxPoints: types.number,
    rewardsAvailable: types.number,
    brandColor: types.string,
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
