import {View, Text} from 'react-native';
import React from 'react';

import {RootStackParamList} from './StackNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cart, Details, Favorite, Home} from '../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<RootStackParamList>();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'rgb(20, 167, 47)',
        headerShown:false
        
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: ({}) => <Icon name="home" size={25} />}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{tabBarIcon: ({}) => <Icon name="shopping-cart" size={25} />}}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{tabBarIcon: ({}) => <Icon name="favorite" size={25} />}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
