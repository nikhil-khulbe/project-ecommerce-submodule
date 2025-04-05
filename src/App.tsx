import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {MyStack} from './Navigator/StackNavigator';
import {ThemeContextProvider} from './Context/ThemeContext';
import {LangaugeContextProvider} from './Context/LanguageContext';

export default function App() {
  return (
    <LangaugeContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </ThemeContextProvider>
    </LangaugeContextProvider>
  );
}
