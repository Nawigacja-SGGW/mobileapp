import { create, StoreApi, UseBoundStore } from 'zustand';

import api from '../../api';

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
  error: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  fetchUserHistory: () => Promise<void>;
  updateUserHistory: (objectId: number, routeCreatedCount: number) => Promise<void>;
  fetchUserStatistics: () => Promise<void>;
  updateUserStatistics: () => Promise<void>;
}

// TODO implement persisting user data and refreshing token after integration with real API
const useRealUserStore = create<StoreState>((set, get) => ({
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
      const response = await api.post('/auth/login', { email, password });
      set({ id: response.data.id, token: response.data.token, email, loading: false, error: null });
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
      await api.patch('/auth/reset-password-request', { email });
      set({ loading: false, error: null });
      return Promise.resolve();
    } catch (error) {
      console.log('Error requesting password reset', error);
      set({ error, loading: false });
      return Promise.reject(error);
    }
  },
  fetchUserHistory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/user-history', { data: { user: get().id } });
      set({ searchHistory: response.data.history, loading: false, error: null });
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
      const response = await api.patch('/user-history', {
        data: { objectId, user: get().id, timestamp: Date.now(), routeCreatedCount },
      });
      // TODO alter only one entry
      set({ searchHistory: response.data.history, loading: false, error: null });
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
      const response = await api.get('/user-statistics', { data: { user: get().id } });
      set({ statistics: response.data.statistics, loading: false, error: null });
      return Promise.resolve();
    } catch (error) {
      console.log('Error fetching user statistics', error);
      set({ error, loading: false });
      return Promise.reject(error);
    }
  },
  updateUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch('/user-statistics', {
        data: { user: get().id, timestamp: Date.now() },
      });
      set({ statistics: response.data.statistics, loading: false, error: null });
      return Promise.resolve();
    } catch (error) {
      console.log('Error updating user statistics', error);
      set({ error, loading: false });
      return Promise.reject(error);
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
  updateUserHistory: async (objectId: number, routeCreatedCount: number) => {
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

//if (process.env.NODE_ENV === 'development') {
//  useUserStore = useFakeUserStore;
//} else {
useUserStore = useRealUserStore;
//}
