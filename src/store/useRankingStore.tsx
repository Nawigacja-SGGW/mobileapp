import { create, StoreApi, UseBoundStore } from 'zustand';

import api from '../../api';

interface UserStatistics {
  userId: number;
  userEmail: string;
  statistics: {
    topFiveVisitedPlaces: { objectId: number; timestamp: string; routeCreatedCount: number }[];
    uniquePlacesVisitedCount: number;
    distanceSum: number;
  };
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
  users: UserStatistics[] | null;
  error: Response | null;
}

function mostVisitsInOnePlace(
  userStatistics: UserStatistics[]
): { userId: number; userEmail: string; count: number }[] {
  return userStatistics.map((user) => {
    if (user.statistics.topFiveVisitedPlaces.length === 0) {
      return {
        userId: user.userId,
        userEmail: user.userEmail,
        count: 0,
      };
    }

    const counts = user.statistics.topFiveVisitedPlaces.map((place) => place.routeCreatedCount);

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
    .map((user) => ({
      userId: user.userId,
      userEmail: user.userEmail,
      distance: user.statistics.distanceSum,
    }))
    .sort((a, b) => b.distance - a.distance);
}

function mostVisitedPlaces(
  userStatistics: UserStatistics[]
): { userId: number; userEmail: string; count: number }[] {
  return userStatistics
    .map((user) => ({
      userId: user.userId,
      userEmail: user.userEmail,
      count: user.statistics.uniquePlacesVisitedCount,
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
            userId: 2,
            userEmail: 'dostepu_do_innych_users@example.com',
            statistics: {
              topFiveVisitedPlaces: [
                { objectId: 1, timestamp: '0000-00-00T00:00', routeCreatedCount: 1 },
                { objectId: 2, timestamp: '0000-00-00T00:00', routeCreatedCount: 2 },
                { objectId: 4, timestamp: '0000-00-00T00:00', routeCreatedCount: 4 },
              ],
              uniquePlacesVisitedCount: 8,
              distanceSum: 33,
            },
          },
          {
            userId: 3,
            userEmail: 'w_trybie_dev_nie_mamy@example.com',
            statistics: {
              topFiveVisitedPlaces: [
                { objectId: 1, timestamp: '0000-00-00T00:00', routeCreatedCount: 7 },
                { objectId: 2, timestamp: '0000-00-00T00:00', routeCreatedCount: 4 },
                { objectId: 3, timestamp: '0000-00-00T00:00', routeCreatedCount: 3 },
                { objectId: 4, timestamp: '0000-00-00T00:00', routeCreatedCount: 2 },
                { objectId: 6, timestamp: '0000-00-00T00:00', routeCreatedCount: 2 },
              ],
              uniquePlacesVisitedCount: 5,
              distanceSum: 121,
            },
          },
          {
            userId: 4,
            userEmail: 'wiec_dane_sa_od_czapy@example.com',
            statistics: {
              topFiveVisitedPlaces: [
                { objectId: 1, timestamp: '0000-00-00T00:00', routeCreatedCount: 2 },
                { objectId: 2, timestamp: '0000-00-00T00:00', routeCreatedCount: 2 },
              ],
              uniquePlacesVisitedCount: 4,
              distanceSum: 13,
            },
          },
          {
            userId: 5,
            userEmail: 'x2rG7@example.com',
            statistics: {
              topFiveVisitedPlaces: [
                { objectId: 1, timestamp: '0000-00-00T00:00', routeCreatedCount: 12 },
                { objectId: 2, timestamp: '0000-00-00T00:00', routeCreatedCount: 14 },
                { objectId: 5, timestamp: '0000-00-00T00:00', routeCreatedCount: 13 },
                { objectId: 6, timestamp: '0000-00-00T00:00', routeCreatedCount: 12 },
                { objectId: 4, timestamp: '0000-00-00T00:00', routeCreatedCount: 11 },
              ],
              uniquePlacesVisitedCount: 4,
              distanceSum: 130,
            },
          },
          {
            userId: 6,
            userEmail: 'vxYlA@example.com',
            statistics: {
              topFiveVisitedPlaces: [
                { objectId: 1, timestamp: '0000-00-00T00:00', routeCreatedCount: 12 },
                { objectId: 2, timestamp: '0000-00-00T00:00', routeCreatedCount: 15 },
                { objectId: 5, timestamp: '0000-00-00T00:00', routeCreatedCount: 13 },
                { objectId: 6, timestamp: '0000-00-00T00:00', routeCreatedCount: 12 },
                { objectId: 4, timestamp: '0000-00-00T00:00', routeCreatedCount: 11 },
              ],
              uniquePlacesVisitedCount: 4,
              distanceSum: 110,
            },
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
      const response = await api.get<FetchUserStatisticsResponse>('/users-rankings');
      set({
        userStatistics: response.data.users,
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
