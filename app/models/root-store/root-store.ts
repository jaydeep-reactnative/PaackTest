import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DeliveryStoreModel } from '../delivery-list/delivery-store'

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  deliveryStore: types.optional(DeliveryStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
