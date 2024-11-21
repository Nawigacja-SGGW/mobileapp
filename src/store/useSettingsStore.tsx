import { create } from 'zustand';

enum RoutePreference {
  Walk,
  Bike,
  // Car,
}

interface StoreState {
  routePreference: RoutePreference;
  language: string;
  setRoutePreference: (routePreference: RoutePreference) => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<StoreState>((set) => ({
  routePreference: RoutePreference.Walk,
  language: 'pl',
  setRoutePreference: (routePreference) => set({ routePreference }),
  setLanguage: (language) => set({ language }),
}));
