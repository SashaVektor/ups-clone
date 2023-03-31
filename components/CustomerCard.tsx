import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomOrders from '../hooks/useCustomOrders'
import { useNavigation } from '@react-navigation/native'
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen'
import { Card, Icon } from '@rneui/themed'

type Props = {
    email: string
    name: string
    userId: string
}

const CustomerCard = ({ email, name, userId }: Props) => {
    const { loading, error, orders } = useCustomOrders(userId)
    const navigation = useNavigation<CustomerScreenNavigationProp>()

    return (
        <TouchableOpacity onPress={() => orders?.length && navigation.navigate("MyModal", {
            name, userId
        })}>
            <Card containerStyle={{ padding: 20, borderRadius: 10 }}>
                <View>
                    <View className='flex-row justify-between'>
                        <View>
                            <Text className='text-2xl font-bold'>{name}</Text>
                            <Text className='text-sm, text-[#59c1cc]'>ID: {userId}</Text>

                        </View>
                        <View className='flex-row items-center justify-end'>
                            <Text className='color-[#59c1cc]'>
                                {loading ? "loading..." : `${orders?.length} x`}
                            </Text>
                            <Icon
                                style={{ marginBottom: 20, marginLeft: "auto" }}
                                name='box'
                                type="entypo"
                                color="#59c1cc"
                                size={50}
                            />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard