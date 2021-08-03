import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetDeliveriesResult, PostDeliveryResult } from './api.types'
import { getGeneralApiProblem } from "./api-problem"
export class DeliveryApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getDeliveries(): Promise<GetDeliveriesResult> {
    try {
      const requestedUrl = 'https://60e84194673e350017c21844.mockapi.io/api/deliveries'
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(requestedUrl)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const deliveries = response.data
      return { kind: "ok", deliveries }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async postDelivery(deliveryId, status, latitude, longitude): Promise<PostDeliveryResult> {
    try {
      const requestedUrl = 'https://60e84194673e350017c21844.mockapi.io/api/finishDelivery'
      const parseData = {
        deliveryId: deliveryId,
        status: status,
        latitude: latitude,
        longitude: longitude
      }
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(requestedUrl, parseData)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const delivery = response.data
      return { kind: "ok", delivery }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
