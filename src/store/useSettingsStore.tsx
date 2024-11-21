// import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

enum RoutePreference {
  Walk,
  Bike,
  // Car,
}

export const useSettingsStore = create(
  persist(
    (set) => ({
      routePreference: RoutePreference.Walk,
      language: 'pl',
      setRoutePreference: (routePreference: RoutePreference) => set({ routePreference }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: 'settings',
      // getStorage: () => AsyncStorage,
    }
  )
);
