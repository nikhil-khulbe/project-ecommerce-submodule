import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
import React from 'react';

import {useCartStore} from '../Store/CartStore';
import LottieView from 'lottie-react-native';
import {Product} from './Home';

const Cart = () => {
  const {cartProduct, setCartProduct,removeFromCart} = useCartStore();
  const total = cartProduct.reduce((acc, item) => acc + item.price, 0);
  // console.log(cartProduct.map())
  console.log(cartProduct);
  const renderCart = ({item}: {item: Product}) => (
    <>
      <View style={styles.individualItem}>
        <View>
          <Image
            source={{uri: item.thumbnail}}
            style={{height: 100, width: 100}}
          />
          <Text
            style={{
              fontSize: 15,
            }}>
            {item.title}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
          }}>
          ₹{item.price}
        </Text>
        <Button title='Remove' onPress={()=>removeFromCart(item.id)}/>
      </View>
    </>
  );

  return (
    <View style={styles.cartCtn}>
      {cartProduct.length > 0 ? (
        <>
          <View style={styles.totalBar}>
            <Text
              style={{
                fontSize: 20,
                position: 'absolute',
              }}>
              Total:{total.toFixed(2)}
            </Text>
          </View>
          <View>
            <FlatList
              data={cartProduct}
              initialNumToRender={7}
              keyExtractor={item => item.id.toString()}
              renderItem={renderCart}
            />
          </View>
        </>
      ) : (
        <LottieView
          source={require('../../EmptyCart.json')}
          autoPlay
          loop
          style={styles.emptyCartani}
        />
      )}
    </View>
  );
};

export default Cart;
const styles = StyleSheet.create({
  emptyCartani: {
    height: 700,
    width: 500,
  },
  cartCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
  individualItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap:10,
    backgroundColor: 'rgba(117,132,145,0.2)',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  totalBar: {
    margin: 100,
    backgroundColor: 'rgb(228,237,101)',
    borderWidth:1
  },
});
