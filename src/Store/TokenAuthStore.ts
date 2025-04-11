import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as Keychain from 'react-native-keychain';

interface TokenAuthStore{
  LoggedIn: boolean;
  setLoggedIn: (value: boolean) => void
  hydrate:()=>Promise<void>
}

export const useTokenAuthStore = create<TokenAuthStore>()(persist((set) => ({
  LoggedIn: false,
  setLoggedIn: (value: boolean) => set({ LoggedIn: value }),
   hydrate: async () => {
        const credentials = await Keychain.getGenericPassword({
          service: 'ProjectECommerce_auth',
        });
              if (credentials.password && credentials.password.length > 0) {
           set({ LoggedIn: true });
        } else {
          set({ LoggedIn: false});
        }
        // set({ LoggedIn: !!credentials?.password });
      },
}),{
  name: 'auth_storage',
  storage:createJSONStorage(()=>AsyncStorage)}
))