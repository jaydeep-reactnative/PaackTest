import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { DeliveryListModel, DeliveryListSnapshot } from "../delivery-list/delivery-list"
import { DeliveryApi } from "../../services/api/delivery-api"
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
    updateDelivery: (data: Record<string, any>) => {
      const fetchDelivery = flow(function * () {
        const clonedDelivery = [...self.delivery]
        try {
          const findIndex = clonedDelivery.findIndex(item => item.id === data.deliveryId)
          clonedDelivery[findIndex].status = data.status
          // self.saveDelivery(clonedDelivery)
        } catch (error) {
          console.error("Failed to fetch projects", error)
        }
        return self.saveDelivery(clonedDelivery)
      })
      fetchDelivery()
    },
  }))
  .actions((self) => ({
    getDeliveries: async () => {
      const deliveryApi = new DeliveryApi(self.environment.api)
      const result = await deliveryApi.getDeliveries()

      if (result.kind === "ok") {
        // console.tron.log('result.characters: ', result.deliveries)
        self.saveDelivery(result.deliveries)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    postDelivery: async (deliveryId, status, latitude, longitude) => {
      const deliveryApi = new DeliveryApi(self.environment.api)
      const result = await deliveryApi.postDelivery(deliveryId, status, latitude, longitude)

      if (result.kind === "ok") {
        // console.tron.log('postDelivery: ', result.delivery)
        // const deliveredId = result.delivery.deliveryId
        const clonedDelivery = [...self.delivery]
        const findIndex = clonedDelivery.findIndex(item => item.id === result.delivery.deliveryId)
        clonedDelivery[findIndex].status = result.delivery.status
        // self.saveDelivery(clonedDelivery)
        // console.tron.log('getDelivery: ', self.delivery)
        self.updateDelivery(result.delivery)
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
