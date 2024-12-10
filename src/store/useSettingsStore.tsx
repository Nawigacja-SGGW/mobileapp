import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum RoutePreference {
  Walk,
  Bike,
  // Car,
}

type StoreState = {
  routePreference: RoutePreference;
  language: string;
  setRoutePreference: (routePreference: RoutePreference) => void;
  setLanguage: (language: string) => void;
};

export const useSettingsStore = create<StoreState>()(
  persist(
    (set) => ({
      routePreference: RoutePreference.Walk,
      language: 'pl',
      setRoutePreference: (routePreference: RoutePreference) => set({ routePreference }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
