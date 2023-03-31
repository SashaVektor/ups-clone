import { View, Text } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import { Divider } from '@rneui/themed'
import MapView, { Marker } from 'react-native-maps'

type Prop = {
  order: Order
  fullWidth?: boolean
}

const DeliveryCard = ({ order, fullWidth }: Prop) => {
  return (
    <Card containerStyle={{
      borderRadius: fullWidth ? 0 : 10,
      marginTop: 8, marginBottom: 8,
      marginLeft: fullWidth ? 0 : undefined,
      marginRight: fullWidth ? 0 : undefined,
      padding: 0,
      backgroundColor: fullWidth ? "#eb6a7c" : "#59c1cc",
      paddingTop: 16, shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: .2,
      shadowRadius: 4,

    }}>
      <View style={fullWidth && { height: "100%" }}>
        <Icon
          name='box'
          type="entypo"
          size={50}
          color="white"
        />
        <View className='items-start p-5 -mt-3'>
          <View className='mx-auto '>
            <Text className='text-sm text-center uppercase text-white font-bold'>
              {order.carrier} - ${order.trackingId}
            </Text>
            <Text className='text-white text-center text-lg font-bold'>
              Expected delivery: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color='white' />
          </View>
          <View className='mx-auto pb-5'>
            <Text className='text-base text-center text-white font-bold mt-5'>
              Address
            </Text>
            <Text className='text-sm text-center text-white'>
              {order.Address}, {order.City}
            </Text>
            <Text className='text-sm text-center italic text-white'>
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>

        <Divider color='white' />
        <View className='p-5'>
          {order?.trackingItems?.items.map(item => (
            <View className='flex-row justify-between items-center' key={item.item_id}>
              <Text className='text-sm italic text-white'>{item.name}</Text>
              <Text className='text-white text-xl'>x {item.quantity}</Text>
            </View>
          ))}
        </View>
        <MapView initialRegion={{
          latitude: order?.Lat,
          longitude: order?.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
          className={`w-full ${!fullWidth && `h-[200px]`} grow`}
        >
          {order?.Lat && order?.Lng && (
            <Marker coordinate={{
              latitude: order?.Lat,
              longitude: order?.Lng
            }}
              title='Delivery Location'
              description={order.Address}
              identifier='destination'
            />
          )}
        </MapView>
      </View>
    </Card>
  )
}

export default DeliveryCard