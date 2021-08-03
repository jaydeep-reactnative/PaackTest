import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DeliveryListModel = types
  .model("DeliveryList")
  .props({
    id: types.maybe(types.string),
    customer: types.maybe(types.string),
    latitude: types.maybe(types.string),
    longitude: types.maybe(types.string),
    address: types.maybe(types.string),
    city: types.maybe(types.string),
    zipCode: types.maybe(types.string),
    status: types.maybe(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type DeliveryListType = Instance<typeof DeliveryListModel>
export interface DeliveryList extends DeliveryListType {}
type DeliveryListSnapshotType = SnapshotOut<typeof DeliveryListModel>
export interface DeliveryListSnapshot extends DeliveryListSnapshotType {}
export const createDeliveryListDefaultModel = () => types.optional(DeliveryListModel, {})
