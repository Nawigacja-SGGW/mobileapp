import { create } from 'zustand';

interface StoreState {
  email: string | null;
  token: string | null;
  distanceSum: number;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  fetchDistanceSum: () => void;
}

// TODO implement caching user data

const useUserStore = create<StoreState>((set) => ({
  email: null,
  token: null,
  distanceSum: 0,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real token
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ email: 'test_user@example.com', token: 'token123abc', loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: () => {
    try {
      // TODO send logout request
      set({ email: null, token: null, loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // TODO send register request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  resetPasswordRequest: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // TODO send reset password request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchDistanceSum: () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real distance sum
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateDistanceSum: (distanceSum: number) => {
    try {
      // TODO send update distance sum request
      set({ distanceSum });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useUserStore;
