import { View, Text } from 'react-native'
import React, {useLayoutEffect} from 'react'
import { useNavigation, RouteProp, CompositeNavigationProp, useRoute } from '@react-navigation/native'
import { RootStackParamsList } from '../navigator/RootNavigator'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import DeliveryCard from '../components/DeliveryCard'

type orderScreenRouteProp = RouteProp<RootStackParamsList, "Order">

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamsList>
>

const OrderScreen = () => {
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    const {params: {order}} = useRoute<orderScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTitleStyle: {color: "black"},
            headerBackTitle: "Deliveries",
            headerTintColor: "#eb6a7c"
        })
    }, [order])
    return (
        <View className='-mt-2'>
            <DeliveryCard order={order} fullWidth/>
        </View>
    )
}

export default OrderScreen