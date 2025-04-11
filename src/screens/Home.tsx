import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  RootTagContext,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Keychain from 'react-native-keychain';
import {useTokenAuthStore} from '../Store/TokenAuthStore';
import SignUp from './SignUp';
import { getAuth } from '@react-native-firebase/auth';
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
  description: string;
  rating: number;
  brand: string;
  dimensions: Dimensions;
}

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: any) => {
  const {LoggedIn, setLoggedIn} = useTokenAuthStore();
  // const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  // console.log('testing', require('../../loading.json'));

  const fetchProductApi = async () => {
    try {
      let response = await fetch('https://dummyjson.com/products');

      let json = await response.json();
      setProducts(json.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductApi();
  }, []);

  // if (loading) {
  //   return <ActivityIndicator size="large" />;
  // }

  const renderItem = ({item}: {item: Product}) => (
    <Pressable onPress={() => navigation.navigate('Details', {product: item})}>
      <View key={item.id} style={styles.productCtn}>
        <View>
          <Image
            source={{uri: item.thumbnail}}
            style={{height: 100, width: 100}}
          />
        </View>
        <View>
          <Text>{item.title}</Text>
          <Text>₹{item.price}</Text>
          <Text>{item.category}</Text>
        </View>
      </View>
    </Pressable>
  );

  async function handleLogOut() {
    console.log(LoggedIn);
    await Keychain.resetGenericPassword({ service: 'ProjectECommerce_auth' });
    const auth = getAuth()
    auth.signOut()
    setLoggedIn(false);
    // navigation.navigate('SignUp');
  }
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={styles.animationCtn}>
          <LottieView
            source={require('../../loading.json')}
            autoPlay
            loop
            style={styles.animation}
            onAnimationFailure={error => console.log(error, 'animation Error')}
          />
        </View>
      ) : (
        <View>
          <Button title="Log Out" onPress={() => handleLogOut()} />
          <FlatList
            renderItem={renderItem}
            initialNumToRender={7}
            keyExtractor={(item: Product) => item.id.toString()}
            data={products}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  productCtn: {
    flexDirection: 'row',
    margin: 20,
    padding: 10,
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(200,50,10,0.2)',
    borderRadius: 20,
  },
  animation: {
    width: 100,
    height: 100,
  },
  animationCtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
