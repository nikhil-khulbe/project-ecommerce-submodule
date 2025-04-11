import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {RootStackParamList} from '../Navigator/StackNavigator';
import {RouteProp} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { useCartStore } from '../Store/CartStore';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsProps {
  route: DetailsScreenRouteProp;
}
const Details = ({ route }: DetailsProps) => {
  const {cartProduct,setCartProduct} = useCartStore()
  const [like, setLiked] = useState(false);
  const [cartAni, setCartAni] = useState(false);
  let heartRef = useRef<AnimatedLottieView>(null);
  let cartAniRef = useRef<AnimatedLottieView>(null);
  const {product} = route.params;
  console.log(product);

  function handleHeart() {
    if (like) {
      heartRef?.current?.reset();
    } else {
      heartRef?.current?.play()
    }
    setLiked(!like)
    
  }
  function handleAddToCart() {
     if (cartAni) {
      cartAniRef?.current?.reset();
    } else {
      cartAniRef?.current?.play()
    }
    setCartAni(!cartAni)
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.individualProductCtn}>
          <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>
            {product.title}
          </Text>
          <Image
            source={{uri: product.thumbnail}}
            style={{height: 300, width: 300}}
          />
          <Text style={{fontSize: 15, textAlign: 'justify'}}>
            {product.description}
          </Text>
          <Text>Brand: {product.brand}</Text>
          <Text>₹ {product.price}</Text>
          <Text>Rating: {product.rating}</Text>
          <Text>Height: {product.dimensions.height}</Text>
          <Text>Width: {product.dimensions.width}</Text>
          <Text>Depth: {product.dimensions.depth}</Text>
          <View style={styles.specialBtn}>
            <Pressable onPress={() => handleHeart()} style={styles.heartBtn}>
              <LottieView
                source={require('../../heartAni.json')}
                loop={false}
                style={styles.animation}
                ref={heartRef}
              />
            </Pressable>
            <Pressable onPress={() => { handleAddToCart(); setCartProduct(product); console.log(cartProduct)}} style={styles.heartBtn}>
              <LottieView
                source={require('../../cartAniNew.json')}
                loop={false}
                style={styles.animationCart}
                ref={cartAniRef}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  individualProductCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    padding: 20,
    gap: 10,
  },
  animation: {
    height: 100,
    width: 100,
    
  },
  animationCart: {
    height: 200,
    width: 200,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius:20
    
  },
  heartBtn: {
    
  },
  specialBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row'
  }
});
