import { create, StoreApi, UseBoundStore } from 'zustand';

import api from '../../api';

interface UserStatistics {
  userId: number;
  userEmail: string;
  topFiveVisitedPlaces: { objectId: number; count: number }[];
  uniquePlacesVisitedCount: number;
  distanceSum: number;
}

interface StoreState {
  userStatistics: UserStatistics[] | null;
  loading: boolean;
  error: any;
  fetchUserStatistics: () => Promise<void>;
  mostVisitsInOnePlace: () => { userId: number; userEmail: string; count: number }[];
  mostDistanceTraveled: () => { userId: number; userEmail: string; distance: number }[];
  mostVisitedPlaces: () => { userId: number; userEmail: string; count: number }[];
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
): { userId: number; userEmail: string; count: number }[] {
  return userStatistics.map((user) => {
    const counts = user.topFiveVisitedPlaces.map((place) => place.count);

    return {
      userId: user.userId,
      userEmail: user.userEmail,
      count: Math.max(...counts),
    };
  });
}

function mostDistanceTraveled(
  userStatistics: UserStatistics[]
): { userId: number; userEmail: string; distance: number }[] {
  return userStatistics
    .map((user) => ({ userId: user.userId, userEmail: user.userEmail, distance: user.distanceSum }))
    .sort((a, b) => b.distance - a.distance);
}

function mostVisitedPlaces(
  userStatistics: UserStatistics[]
): { userId: number; userEmail: string; count: number }[] {
  return userStatistics
    .map((user) => ({
      userId: user.userId,
      userEmail: user.userEmail,
      count: user.uniquePlacesVisitedCount,
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
            userEmail: '0Kp8o@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 1 },
              { objectId: 2, count: 2 },
              { objectId: 4, count: 4 },
            ],
            uniquePlacesVisitedCount: 8,
            distanceSum: 33,
          },
          {
            userId: 2,
            userEmail: 'RbF7w@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 7 },
              { objectId: 2, count: 4 },
              { objectId: 3, count: 3 },
              { objectId: 4, count: 2 },
              { objectId: 6, count: 2 },
            ],
            uniquePlacesVisitedCount: 5,
            distanceSum: 121,
          },
          {
            userId: 2,
            userEmail: '4dXG3@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 2 },
              { objectId: 2, count: 2 },
            ],
            uniquePlacesVisitedCount: 4,
            distanceSum: 13,
          },
          {
            userId: 2,
            userEmail: 'x2rG7@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 12 },
              { objectId: 2, count: 14 },
              { objectId: 5, count: 13 },
              { objectId: 6, count: 12 },
              { objectId: 4, count: 11 },
            ],
            uniquePlacesVisitedCount: 4,
            distanceSum: 130,
          },
          {
            userId: 2,
            userEmail: 'vxYlA@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 12 },
              { objectId: 2, count: 15 },
              { objectId: 5, count: 13 },
              { objectId: 6, count: 12 },
              { objectId: 4, count: 11 },
            ],
            uniquePlacesVisitedCount: 4,
            distanceSum: 110,
          },
          {
            userId: 2,
            userEmail: 'aBcYK@example.com',
            topFiveVisitedPlaces: [
              { objectId: 1, count: 12 },
              { objectId: 2, count: 14 },
              { objectId: 5, count: 13 },
              { objectId: 6, count: 12 },
              { objectId: 4, count: 11 },
            ],
            uniquePlacesVisitedCount: 4,
            distanceSum: 135,
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
  mostVisitsInOnePlace: (): { userId: number; userEmail: string; count: number }[] =>
    mostVisitsInOnePlace(get().userStatistics || []),
  mostDistanceTraveled: (): { userId: number; userEmail: string; distance: number }[] =>
    mostDistanceTraveled(get().userStatistics || []),
  mostVisitedPlaces: (): { userId: number; userEmail: string; count: number }[] =>
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
  mostVisitsInOnePlace: (): { userId: number; userEmail: string; count: number }[] =>
    mostVisitsInOnePlace(get().userStatistics || []),
  mostDistanceTraveled: (): { userId: number; userEmail: string; distance: number }[] =>
    mostDistanceTraveled(get().userStatistics || []),
  mostVisitedPlaces: (): { userId: number; userEmail: string; count: number }[] =>
    mostVisitedPlaces(get().userStatistics || []),
}));

export let useRankingStore: UseBoundStore<StoreApi<StoreState>>;

if (process.env.EXPO_PUBLIC_MODE === 'development') {
  useRankingStore = useFakeRankingStore;
} else {
  useRankingStore = useRealRankingStore;
}
