import {createJSONStorage, persist} from 'zustand/middleware';
import {Product} from './../screens/Home';
import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Cart {
  cartProduct: Product[];
  setCartProduct: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create<Cart>()(
  persist(
    set => ({
      cartProduct: [],
      setCartProduct: (product: Product) =>
        set(state => ({
          cartProduct: [...state.cartProduct, product],
        })),
      removeFromCart: (productId: number) =>
        set(state => ({
          cartProduct: state.cartProduct.filter(item => item.id !== productId),
        })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
