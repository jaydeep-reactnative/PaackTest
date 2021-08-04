import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { FlatList, Image, TouchableOpacity, View } from "react-native"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import * as DeliveryList from './delivery-list-screen-style'

const paack = require("./paack.png")

export const DeliveryListScreen = observer(function DeliveryListScreen() {
  const navigation = useNavigation()

  const { deliveryStore } = useStores()
  const { delivery } = deliveryStore

  useEffect(() => {
    async function fetchData() {
      if (delivery || delivery.length <= 0) {
        await deliveryStore.getDeliveries()
      }
    }
    fetchData()
  }, [])

  return (
    <View style={DeliveryList.FULL}>
      <Wallpaper />
      <Screen style={DeliveryList.CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="deliveryListScreen.title"
          style={DeliveryList.HEADER}
          titleStyle={DeliveryList.HEADER_TITLE}
        />
        <FlatList
          contentContainerStyle={DeliveryList.FLAT_LIST}
          data={delivery}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('deliveryDetails', { item })}>
              <View style={DeliveryList.LIST_CONTAINER}>
                <Image source={paack} style={DeliveryList.IMAGE} />
                <Text style={DeliveryList.LIST_TEXT}>
                  {item.customer} ({item.city})
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Screen>
    </View>
  )
})
