import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Icon } from '@rneui/themed'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'

type Prop = {
    item: Order
}

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamsList>
>

const OrderCard = ({ item }: Prop) => {
    const navigation = useNavigation<OrdersScreenNavigationProp>()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Order", {order: item})}>
            <Card containerStyle={{ paddingLeft: 20, paddingRight: 20, borderRadius: 10 }}>
                <View className='flex-row justify-between items-center'>
                    <View>
                        <Icon
                            name='truck-delivery'
                            color="#eb6a7c"
                            type='material-community'
                        />
                        <Text className='text-[10px]'>
                            {new Date(item.createdAt).toDateString()}
                        </Text>
                    </View>
                    <View>
                        <Text className='text-gray-400 text-[10px]'>
                            {item.carrier} - {item.trackingId}
                        </Text>
                        <Text className='text-gray-500 text-xl'>
                            {item.trackingItems.customer.name}
                        </Text>
                    </View>
                    <View className='flex-row items-center'>
                        <Text className='text-[#eb6a7c] text-sm'>
                            {item.trackingItems.items.length} x
                        </Text>
                        <Icon
                            name='box'
                            type='feather'
                            style={{marginLeft: 8}}
                        />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default OrderCard