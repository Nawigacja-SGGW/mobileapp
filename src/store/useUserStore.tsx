import { create, StoreApi, UseBoundStore } from 'zustand';

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
  extendSession: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  fetchUserHistory: () => Promise<void>;
  updateUserHistory: (objectId: number) => Promise<void>;
  fetchUserStatistics: () => Promise<void>;
  updateUserStatistics: () => Promise<void>;
}

// TODO implement caching user data
const useRealUserStore = create<StoreState>((set) => ({
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
      // TODO fetch real token and id, set email
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  extendSession: async () => {
    try {
      set({ loading: true, error: null });
      // TODO send extend session request
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
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
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  resetPasswordRequest: async (email: string) => {
    set({ loading: true, error: null });
    try {
      // TODO send reset password request
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserHistory: async () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real user history
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserHistory: async (objectId: number) => {
    set({ loading: true, error: null });
    try {
      // TODO update real user history
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      // TODO fetch real user statistics
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      // TODO update real user statistics
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

const useFakeUserStore = create<StoreState>((set) => ({
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ id: 1, email, token: 'token123abc', loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  extendSession: async () => {
    try {
      set({ loading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        email: null,
        token: null,
        statistics: null,
        searchHistory: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  resetPasswordRequest: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserHistory: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        searchHistory: [
          { objectId: 1, timestamp: 1, routeCreatedCount: 1 },
          { objectId: 2, timestamp: 2, routeCreatedCount: 2 },
          { objectId: 3, timestamp: 3, routeCreatedCount: 3 },
          { objectId: 4, timestamp: 4, routeCreatedCount: 4 },
          { objectId: 5, timestamp: 5, routeCreatedCount: 5 },
        ],
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserHistory: async (objectId: number) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  fetchUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        statistics: {
          topFiveVisitedPlaces: [
            { objectId: 1, count: 1 },
            { objectId: 2, count: 2 },
            { objectId: 3, count: 3 },
            { objectId: 4, count: 4 },
            { objectId: 5, count: 5 },
          ],
          uniquePlacesVisitedCount: 5,
          distanceSum: 33,
        },
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export let useUserStore: UseBoundStore<StoreApi<StoreState>>;

if (process.env.NODE_ENV === 'development') {
  useUserStore = useFakeUserStore;
} else {
  useUserStore = useRealUserStore;
}
