import {View, Text} from 'react-native';
import React from 'react';

import {RootStackParamList} from './StackNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Cart, Details, Favorite, Home } from '../screens';



const Tab = createBottomTabNavigator<RootStackParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
        tabBarActiveTintColor:"rgb(20, 167, 47)"}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart}  />
      <Tab.Screen name="Favorite" component={Favorite}  />
    </Tab.Navigator>
  );
};

export default TabNavigator;
