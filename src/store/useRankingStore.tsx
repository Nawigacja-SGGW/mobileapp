import { create, StoreApi, UseBoundStore } from 'zustand';

import api from '../../api';

interface UserStatistics {
  userId: number;
  topFiveVisitedPlaces: { objectId: number; count: number }[];
  uniquePlacesVisitedCount: number;
  distanceSum: number;
}

interface StoreState {
  userStatistics: UserStatistics[] | null;
  loading: boolean;
  error: any;
  fetchUserStatistics: () => Promise<void>;
  mostVisitsInOnePlace: () => { userId: number; count: number }[];
  mostDistanceTraveled: () => { userId: number; distance: number }[];
  mostVisitedPlaces: () => { objectId: number; count: number }[];
}

type Response = {
  code: number;
  message: string;
};

interface FetchUserStatisticsResponse {
  userStatistics: UserStatistics[] | null;
  error: Response | null;
}

function mostVisitsInOnePlace(
  userStatistics: UserStatistics[]
): { userId: number; count: number }[] {
  return userStatistics
    .map((user) => ({ userId: user.userId, count: user.topFiveVisitedPlaces[0].count }))
    .sort((a, b) => b.count - a.count);
}

function mostDistanceTraveled(
  userStatistics: UserStatistics[]
): { userId: number; distance: number }[] {
  return userStatistics
    .map((user) => ({ userId: user.userId, distance: user.distanceSum }))
    .sort((a, b) => b.distance - a.distance);
}

function mostVisitedPlaces(
  userStatistics: UserStatistics[]
): { objectId: number; count: number }[] {
  return userStatistics
    .map((user) => ({
      objectId: user.topFiveVisitedPlaces[0].objectId,
      count: user.topFiveVisitedPlaces[0].count,
    }))
    .sort((a, b) => b.count - a.count);
}

const useFakeRankingStore = create<StoreState>((set, get) => ({
  userStatistics: null,
  loading: false,
  error: null,
  fetchUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        userStatistics: [
          {
            userId: 1,
            topFiveVisitedPlaces: [
              { objectId: 1, count: 1 },
              { objectId: 2, count: 2 },
              { objectId: 3, count: 3 },
              { objectId: 4, count: 4 },
              { objectId: 5, count: 5 },
            ],
            uniquePlacesVisitedCount: 5,
            distanceSum: 10,
          },
          {
            userId: 2,
            topFiveVisitedPlaces: [
              { objectId: 1, count: 5 },
              { objectId: 2, count: 4 },
              { objectId: 3, count: 3 },
              { objectId: 4, count: 2 },
              { objectId: 6, count: 2 },
            ],
            uniquePlacesVisitedCount: 5,
            distanceSum: 10,
          },
        ],
        loading: false,
        error: null,
      });
      return Promise.resolve();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return Promise.reject(error);
    }
  },
  mostVisitsInOnePlace: (): { userId: number; count: number }[] =>
    mostVisitsInOnePlace(get().userStatistics || []),
  mostDistanceTraveled: (): { userId: number; distance: number }[] =>
    mostDistanceTraveled(get().userStatistics || []),
  mostVisitedPlaces: (): { objectId: number; count: number }[] =>
    mostVisitedPlaces(get().userStatistics || []),
}));

const useRealRankingStore = create<StoreState>((set, get) => ({
  userStatistics: null,
  loading: false,
  error: null,
  fetchUserStatistics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<FetchUserStatisticsResponse>('/user-statistics');
      set({
        userStatistics: response.data.userStatistics,
        loading: false,
        error: null,
      });
      return Promise.resolve();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return Promise.reject(error);
    }
  },
  mostVisitsInOnePlace: (): { userId: number; count: number }[] =>
    mostVisitsInOnePlace(get().userStatistics || []),
  mostDistanceTraveled: (): { userId: number; distance: number }[] =>
    mostDistanceTraveled(get().userStatistics || []),
  mostVisitedPlaces: (): { objectId: number; count: number }[] =>
    mostVisitedPlaces(get().userStatistics || []),
}));

export let useRankingStore: UseBoundStore<StoreApi<StoreState>>;

if (process.env.EXPO_PUBLIC_MODE === 'development') {
  useRankingStore = useFakeRankingStore;
} else {
  useRankingStore = useRealRankingStore;
}
