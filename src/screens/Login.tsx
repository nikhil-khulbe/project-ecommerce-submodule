import { View, Text, Pressable, Button,TextInput } from 'react-native'
import React from 'react'
import TabNavigator from '../Navigator/TabNavigator'


const Login = ({navigation}:any) => {
  return (
    <View>
      <TextInput placeholder='Username'/>
      <TextInput placeholder='Password'/>
      <Button title='Login' onPress={()=>navigation.navigate('MainTabs')} />
    </View>
  )
}

export default Login