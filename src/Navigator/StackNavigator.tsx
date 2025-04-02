import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Cart,
  Favorite,
  Home,
  Details,
  Login,
  Profile,
  Setting,
} from '../screens';
import {Product} from '../screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favorite: undefined;
  Login: undefined;
  Details: {product: Product};
  Profile: undefined;
  Setting: undefined;
  MainTabs:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MyStack() {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(232, 86, 78,0.8)',
            },
            contentStyle: {
              backgroundColor: 'rgba(232, 86, 78,0.2)',
            },
          }}
        />
        {/* <Stack.Screen name="Cart" component={Cart} />*/}
        
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} /> 
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </>
  );
}
