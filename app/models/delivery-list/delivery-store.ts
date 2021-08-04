import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { DeliveryApi } from "../../services/api/delivery-api"
import { DeliveryListModel, DeliveryListSnapshot } from "../delivery-list/delivery-list"
import { withEnvironment } from "../extensions/with-environment"

export const DeliveryStoreModel = types
  .model("DeliveryStore")
  .props({
    delivery: types.optional(types.array(DeliveryListModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveDelivery: (deliveryListSnapshots: DeliveryListSnapshot[]) => {
      self.delivery.replace(deliveryListSnapshots)
    },
  }))
  .actions((self) => ({
    getDeliveries: async () => {
      const deliveryApi = new DeliveryApi(self.environment.api)
      const result = await deliveryApi.getDeliveries()

      if (result.kind === "ok") {
        self.saveDelivery(result.deliveries)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    postDelivery: async (deliveryId, status, latitude, longitude) => {
      const deliveryApi = new DeliveryApi(self.environment.api)
      const result = await deliveryApi.postDelivery(deliveryId, status, latitude, longitude)

      if (result.kind === "ok") {
        const deliveredId = result.delivery.deliveryId
        const clonedDelivery = [...self.delivery]
        const findIndex = clonedDelivery.findIndex(item => item.id === deliveredId)
        clonedDelivery[findIndex].status = result.delivery.status
        self.saveDelivery(clonedDelivery)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type DeliveryStoreType = Instance<typeof DeliveryStoreModel>
export interface DeliveryStore extends DeliveryStoreType {}
type DeliveryStoreSnapshotType = SnapshotOut<typeof DeliveryStoreModel>
export interface DeliveryStoreSnapshot extends DeliveryStoreSnapshotType {}
export const createDeliveryStoreDefaultModel = () => types.optional(DeliveryStoreModel, {})
