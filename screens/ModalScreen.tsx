import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { CompositeNavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from '../navigator/TabNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'
import useCustomOrders from '../hooks/useCustomOrders'
import DeliveryCard from '../components/DeliveryCard'

type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamList>,
    NativeStackNavigationProp<RootStackParamsList, "MyModal">
>

type ModalScreenRouteProp = RouteProp<RootStackParamsList, "MyModal">

const ModalScreen = () => {
    const navigation = useNavigation<ModalScreenNavigationProp>();

    const { params: { name, userId } } = useRoute<ModalScreenRouteProp>()

    const { loading, error, orders } = useCustomOrders(userId);
    return (
        <View>
            <TouchableOpacity className='absolute right-5 top-5 z-10'
                onPress={() => navigation.goBack()}>
                <Icon name='closecircle' type='antdesign' />
            </TouchableOpacity>
            <View className='mt-5'>
                <View className='py-5 border-b border-[#59c1cc]'>
                    <Text className='text-center text-xl font-bold, text-[#59c1cc]'>{name}</Text>
                    <Text className='text-center italic text-sm'>deliveries</Text>
                </View>
            </View>
            <FlatList 
            data={orders} 
            keyExtractor={order => String(order.trackingId)}
            renderItem={({item: order}) => <DeliveryCard order={order}/>}
            contentContainerStyle={{paddingBottom: 200}}
            />
        </View>
    )
}

export default ModalScreen