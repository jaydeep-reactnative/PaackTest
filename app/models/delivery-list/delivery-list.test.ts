import { DeliveryListModel } from "./delivery-list"

test("can be created", () => {
  const instance = DeliveryListModel.create({})

  expect(instance).toBeTruthy()
})
