import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../Navigator/StackNavigator';
import {RouteProp} from '@react-navigation/native';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsProps {
  route: DetailsScreenRouteProp;
}
const Details = ({route}: DetailsProps) => {
  const {product} = route.params;
  console.log(product);
  return (
    <View>
      <ScrollView >
        <View style={styles.individualProductCtn}>
        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>{product.title}</Text>
        <Image source={{uri:product.thumbnail}} style={{height:300,width:300}} />
        <Text style={{fontSize:15,textAlign:'justify'}}>{product.description}</Text>
        <Text>Brand: {product.brand}</Text>
        <Text>₹ {product.price}</Text>
        <Text>Rating: {product.rating}</Text>
        <Text>Height: {product.dimensions.height}</Text>
        <Text>Width: {product.dimensions.width}</Text>
        <Text>Depth: {product.dimensions.depth}</Text>
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
    gap:10
    
  }
})