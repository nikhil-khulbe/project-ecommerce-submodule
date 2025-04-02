import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  RootTagContext,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
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
  // const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  console.log("testing",require('../../loading.json'))

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

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

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

  return (
    <View>
      {loading ? (
        <LottieView
          
          source={require('../../loading.json')} 
          autoPlay
          loop
          style={styles.animation}
          onAnimationFailure={(error)=>console.log(error,'animation Error')}
        />
      ) : (
        <FlatList
          renderItem={renderItem}
          initialNumToRender={7}
          keyExtractor={(item: Product) => item.id.toString()}
          data={products}
        />
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
    width: 200,
    height: 200,
    backgroundColor:'red'
  },
});
