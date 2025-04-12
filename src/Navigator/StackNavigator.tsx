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
  SignUp,
} from '../screens';
import {Product} from '../screens/Home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {useTokenAuthStore} from '../Store/TokenAuthStore';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Favorite: undefined;
  Login: undefined;
  Details: {product: Product};
  Profile: undefined;
  Setting: undefined;
  MainTabs: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function MyStack() {
  const {LoggedIn, setLoggedIn} = useTokenAuthStore();
  return (
    <>
      <Stack.Navigator initialRouteName={LoggedIn ? 'MainTabs' : 'SignUp'}>
        {LoggedIn ? (
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        )}

        {/* {LoggedIn ? (
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        )} */}
        {/* <Stack.Screen
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
        /> */}
        {/* <Stack.Screen name="Cart" component={Cart} />*/}
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </>
  );
}
