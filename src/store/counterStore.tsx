import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // for persisting the data, optional

export type CounterStore = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      counter: 1,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    }),
    {
      name: 'conterStorage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
