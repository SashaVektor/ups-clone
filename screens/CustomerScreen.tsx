import { Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { TabStackParamList } from "../navigator/TabNavigator"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../navigator/RootNavigator'
import { Input } from '@rneui/themed'
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from '../graphql/queries'
import CustomerCard from '../components/CustomerCard'


export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamsList>
>

const CustomerScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>("")
  const { loading, error, data } = useQuery(GET_CUSTOMERS)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const filteredData = data?.getCustomers
    ?.filter((customer: CustomerList) => customer.value.name.toUpperCase()
    .includes(input.toUpperCase()))

  return (
    <ScrollView className='bg-[#59c1cc]'>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        className='w-full h-64'
      />
      <Input placeholder='Search by Customer' value={input} onChangeText={text => setInput(text)}
        containerStyle={{
          backgroundColor: "white", paddingLeft: 40,
          paddingRight: 40, paddingBottom: 0, paddingTop: 20
        }}
      />
      {filteredData?.length === 0 && <Text className='text-center text-lg text-white my-3'>No results!</Text>}
      {filteredData?.map(({ name: ID, value: { email, name } }: CustomerResponse) => (
        <CustomerCard key={ID} email={email} name={name} userId={ID} />
      ))}
    </ScrollView>
  )
}

export default CustomerScreen