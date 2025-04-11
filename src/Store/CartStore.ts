import {Product} from './../screens/Home';
import {create} from 'zustand';

export interface Cart {
  cartProduct: Product[];
  setCartProduct: (product: Product) => void;
}

export const useCartStore = create<Cart>(set => ({
  cartProduct: [],
  setCartProduct: (product: Product) =>
    set((state) => ({
      cartProduct: [...state.cartProduct, product],
    })),
}));
