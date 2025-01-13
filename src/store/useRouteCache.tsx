import { create } from 'zustand';

interface CacheStore {
  cache: object;
  fetchRoute: (routedBy: string, wayString: string) => Promise<[number, number][]>;
}

export const useRoutingApiCache = create<CacheStore>((set, get) => ({
  cache: {}, // Obiekt cache
  fetchRoute: async (routedBy: string, wayString: string) => {
    const cacheKey = `${routedBy}-${wayString}`; // Unikalny klucz dla cache
    const cache = get().cache;

    if (cache[cacheKey]) {
      console.log('Using cached data');
      return cache[cacheKey];
    }

    console.log('Fetching new data');
    try {
      const response = await fetch(
        `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/${routedBy}/${wayString}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      set((state) => ({
        cache: { ...cache, [cacheKey]: data },
      }));

      return data;
    } catch (error) {
      console.error('Error fetching route:', error);
      throw error;
    }
  },
}));
