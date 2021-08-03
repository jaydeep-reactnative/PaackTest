import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Image, Platform, View } from "react-native"
import Geolocation from 'react-native-geolocation-service'
import { checkMultiple, PERMISSIONS, requestMultiple } from 'react-native-permissions'
import { BulletItem, Button, Header, Screen, Text, Wallpaper } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import * as DeliveryDetails from './delivery-details-screen-style'

// export const logoIgnite = require("./logo-ignite.png")
const heart = require("./heart.png")

export const DeliveryDetailsScreen = ({ route }) => {
  // Pull in one of our MST stores
  const { deliveryStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const { item } = route.params

  const [isDeliveryStart, setDeliveryStatus] = useState(false)
  const [currentLocation, setLocation] = useState(null)

  useEffect(() => {
    if (Platform.OS === 'ios') {
      checkMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then((statuses) => {
        statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === 'granted'
          ? getCurrentPosition()
          : requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
            console.tron.log('Location always ios', statuses[PERMISSIONS.IOS.LOCATION_ALWAYS])
            console.tron.log('Location when use ios', statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
          })
      })
    } else {
      checkMultiple([PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
        statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] === 'granted' || statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === 'granted' || statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === 'granted'
          ? getCurrentPosition()
          : requestMultiple([PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then((statuses) => {
            console.tron.log('Location background android', statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION])
            console.tron.log('Location coarse android', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION])
            console.tron.log('Location fine android', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION])
          })
      })
    }
    console.tron.log('Item: ', item)
  }, [])

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.tron.log('Position: ', position)
        setLocation(position.coords)
      },
      (error) => {
        // See error code charts below.
        console.tron.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const productDelivered = async() => {
    await deliveryStore.postDelivery(item.id, "delivered", currentLocation.latitude, currentLocation.longitude)
  }

  const productUndelivered = async() => {
    await deliveryStore.postDelivery(item.id, "undelivered", currentLocation.latitude, currentLocation.longitude)
  }

  return (
    <View style={DeliveryDetails.FULL}>
      <Wallpaper />
      <Screen style={DeliveryDetails.CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="deliveryDetailsScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={DeliveryDetails.HEADER}
          titleStyle={DeliveryDetails.HEADER_TITLE}
        />
        <Text style={DeliveryDetails.TITLE} preset="header" text={item.customer} />
        <BulletItem text={`Id: ${item.id}`} />
        <BulletItem text={`Address: ${item.address}`} />
        <BulletItem text={`City: ${item.city}`} />
        <BulletItem text={`Zipcode: ${item.zipCode}`} />
        <View>
          {!isDeliveryStart &&
            <Button
              style={DeliveryDetails.DEMO}
              textStyle={DeliveryDetails.DEMO_TEXT}
              tx="deliveryDetailsScreen.makeDelivery"
              onPress={() => setDeliveryStatus(true)}
            />
          }
          {
            isDeliveryStart &&
            <View>
              <Button
                style={DeliveryDetails.DEMO}
                textStyle={DeliveryDetails.DEMO_TEXT}
                tx="deliveryDetailsScreen.delivered"
                onPress={() => productDelivered()}
              />
              <Button
                style={DeliveryDetails.DEMO}
                textStyle={DeliveryDetails.DEMO_TEXT}
                tx="deliveryDetailsScreen.undelivered"
                onPress={() => productUndelivered()}
              />
            </View>
          }

        </View>
        <View style={DeliveryDetails.LOVE_WRAPPER}>
          <Text style={DeliveryDetails.LOVE} text="Made with" />
          <Image source={heart} style={DeliveryDetails.HEART} />
          <Text style={DeliveryDetails.LOVE} text="by Paack" />
        </View>
      </Screen>
    </View>
  )
}
