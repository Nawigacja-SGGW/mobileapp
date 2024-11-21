import { create } from 'zustand';

interface SearchHistoryEntry {
  objectId: number;
  timestamp: number;
  routeCreatedCount: number;
}

interface UserStatistics {
  topFiveVisitedPlaces: { objectId: number; count: number }[];
  uniquePlacesVisitedCount: number;
  distanceSum: number;
}

interface StoreState {
  id: number | null;
  email: string | null;
  token: string | null;
  statistics: UserStatistics | null;
  searchHistory: SearchHistoryEntry[] | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  fetchUserDetails: () => Promise<void>;
  fetchUserHistory: () => Promise<void>;
  fetchUserStatistics: () => Promise<void>;
}

// TODO implement caching user data

const useUserStore = create<StoreState>((set) => ({
  id: null,
  email: null,
  token: null,
  statistics: null,
  searchHistory: null,
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
  logout: async () => {
    try {
      set({ loading: true, error: null });
      // TODO send logout request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ email: null, token: null, loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // TODO send register request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  resetPasswordRequest: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // TODO send reset password request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserDetails: async () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real user data using id
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserHistory: async () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real user history
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real user statistics
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useUserStore;
