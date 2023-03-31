import { View, Text, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamsList } from '../navigator/RootNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useOrders from '../hooks/useOrders'
import { Button } from '@rneui/themed'
import OrderCard from '../components/OrderCard'

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamsList>
>

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [asc, setAsc] = useState<boolean>(false)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <ScrollView className='bg-[#eb6a7c]'>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        className='w-full h-64'
      />
      <View>
        <Button
          onPress={() => setAsc(!asc)}
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={{ paddingBottom: 8, paddingTop: 8, paddingLeft: 20, paddingRight: 20 }}
        >
          {asc ? "Showing: Oldest First" : "Showing: Most Recent First"}
        </Button>
        {orders?.sort((a, b) => {
          if (asc) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
          } else {
            return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1
          }
        }).map(order => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
      </View>
    </ScrollView>
  )
}

export default OrdersScreen