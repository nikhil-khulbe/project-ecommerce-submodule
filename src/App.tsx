import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {MyStack} from './Navigator/StackNavigator';
import {ThemeContextProvider} from './Context/ThemeContext';
import {LangaugeContextProvider} from './Context/LanguageContext';
import {useTokenAuthStore} from './Store/TokenAuthStore';
import * as Keychain from 'react-native-keychain';
import { getAuth } from '@react-native-firebase/auth';

export default function App() {
  const {LoggedIn, setLoggedIn,hydrate} = useTokenAuthStore();

  useEffect(() => {
    setLoggedIn(getAuth()?.currentUser?.email?true:false)
    // const checkAuthState = async () => {
    //  await hydrate()
      
    // };
    
    // checkAuthState();
  }, [getAuth().currentUser]);
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
