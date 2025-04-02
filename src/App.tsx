import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { MyStack} from './Navigator/StackNavigator';

export default function App() {
  return (
    <NavigationContainer><MyStack/></NavigationContainer>
  );
}