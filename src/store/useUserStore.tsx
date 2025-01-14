import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import api from '../../api';

interface SearchHistoryEntry {
  objectId: number;
  timestamp: number;
  routeCreatedCount: number;
}

interface UserStatistics {
  topFiveVisitedPlaces: { objectId: number; timestamp: string; routeCreatedCount: number }[];
  uniquePlacesVisitedCount: number;
  distanceSum: number;
}

interface StoreState {
  id: number | null;
  email: string | null;
  token: string | null;
  statistics: UserStatistics | null;
  searchHistory: SearchHistoryEntry[];
  loading: boolean;
  error: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  fetchUserHistory: () => Promise<void>;
  updateUserHistory: (objectId: number, routeCreatedCount: number) => Promise<void>;
  fetchUserStatistics: () => Promise<void>;
  updateUserStatistics: (newDistanceSum: number) => Promise<void>;
}

type Response = {
  code: number;
  message: string;
};

interface LoginResponse extends Response {
  userId: number;
  token: string;
}

interface FetchUserHistory extends Response {
  history: SearchHistoryEntry[];
}

interface FetchUserStatistics extends Response {
  statistics: UserStatistics;
}

const useRealUserStore = create<StoreState>()(
  persist(
    (set, get) => ({
      id: null,
      email: null,
      token: null,
      statistics: null,
      searchHistory: [],
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post<LoginResponse>('/auth/login', { email, password });
          set({
            id: response.data.userId,
            token: response.data.token,
            email,
            loading: false,
            error: null,
          });
          return Promise.resolve();
        } catch (error) {
          console.log('Error logging in', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      logout: async () => {
        try {
          set({ loading: true, error: null });
          await api.post('/auth/logout', { token: get().token });
          set({ id: null, email: null, token: null, loading: false, error: null });
          return Promise.resolve();
        } catch (error) {
          console.log('Error logging out', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      register: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          await api.post('/auth/register', { email, password });
          set({ loading: false, error: null });
          return Promise.resolve();
        } catch (error) {
          console.log('Error registering', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      resetPasswordRequest: async (email: string) => {
        set({ loading: true, error: null });
        try {
          await api.put('/auth/reset-password-request', { email });
          set({ loading: false, error: null });
          return Promise.resolve();
        } catch (error) {
          console.log('Error requesting password reset', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      resetPassword: async (newPassword: string) => {
        set({ loading: true, error: null });
        try {
          await api.patch('/auth/reset-password', { token: get().token, password: newPassword });
          set({ loading: false, error: null });
          return Promise.resolve();
        } catch (error) {
          console.log('Error resetting password', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      fetchUserHistory: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get<FetchUserHistory>('/user-history', {
            params: { user_id: get().id },
          });
          set({
            searchHistory: response.data.history,
            loading: false,
            error: null,
          });
          return Promise.resolve();
        } catch (error) {
          console.log('Error fetching user history', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      updateUserHistory: async (objectId: number, routeCreatedCount: number) => {
        set({ loading: true, error: null });
        try {
          console.log(Date.now().toString());
          await api.post('/user-history', {
            object_id: objectId,
            user_id: get().id,
            timestamp: new Date().toISOString(),
            route_created_count: routeCreatedCount,
          });
          return Promise.resolve();
        } catch (error) {
          console.log('Error updating user history', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      fetchUserStatistics: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get<FetchUserStatistics>('/user-statistics', {
            params: { user_id: get().id },
          });
          set({ statistics: response.data.statistics, loading: false, error: null });
          return Promise.resolve();
        } catch (error) {
          console.log('Error fetching user statistics', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
      updateUserStatistics: async (newDistanceSum: number) => {
        set({ loading: true, error: null });
        const currentDist = get().statistics?.distanceSum ?? 0;
        try {
          await api.patch('/user-statistics', {
            user_id: get().id,
            distance_sum: currentDist + Math.round(newDistanceSum),
          });
          return Promise.resolve();
        } catch (error) {
          console.log('Error updating user statistics', error);
          set({ error, loading: false });
          return Promise.reject(error);
        }
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

const useFakeUserStore = create<StoreState>((set, get) => ({
  id: null,
  email: null,
  token: null,
  statistics: null,
  searchHistory: [],
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
        searchHistory: [],
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
  resetPassword: async (newPassword: string) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ loading: false, error: null });
      return Promise.resolve();
    } catch (error) {
      console.log('Error resetting password', error);
      set({ error, loading: false });
      return Promise.reject(error);
    }
  },
  fetchUserHistory: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        searchHistory: get().searchHistory,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserHistory: async (objectId: number, routeCreatedCount: number) => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const history = get().searchHistory;
      history.push({ objectId, routeCreatedCount, timestamp: Date.now() });
      if (history.length >= 6) {
        history.shift();
      }
      set({ searchHistory: history });
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
          topFiveVisitedPlaces: get().statistics?.topFiveVisitedPlaces ?? [],
          uniquePlacesVisitedCount: get().statistics?.uniquePlacesVisitedCount ?? 0,
          distanceSum: get().statistics?.distanceSum ?? 0,
        },
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateUserStatistics: async (newDistanceSum: number) => {
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

if (process.env.EXPO_PUBLIC_MODE === 'development') {
  useUserStore = useFakeUserStore;
} else {
  useUserStore = useRealUserStore;
}
