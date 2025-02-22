export type QRScanPayload = {
  userId: string
  operation: QRScanOperation
  storeId?: string
  points?: number
  rewardId?: string
}

export enum QRScanOperation {
  CREATE_STORE_CARD = "create_store_card",
  ADD_STORE_POINTS = "add_store_points",
  SUBTRACT_STORE_POINTS = "subtract_store_points",
}
