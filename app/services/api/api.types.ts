import { GeneralApiProblem } from "./api-problem"
import { DeliveryList } from '../../models/delivery-list/delivery-list'
export interface PostDelivery {
  id: string
  deliveryId: string
  status: string
  latitude: string
  longitude: string
}

export type GetDeliveriesResult = { kind: "ok"; deliveries: DeliveryList[] } | GeneralApiProblem
export type GetDeliveryResult = { kind: "ok"; delivery: DeliveryList } | GeneralApiProblem

export type PostDeliveryResult = { kind: "ok"; delivery: PostDelivery } | GeneralApiProblem
