import { create } from 'zustand';

import { useObjectsStore } from '~/store/useObjectsStore';

export interface MapLocation {
  id: number;
  name: string;
  icon: JSX.Element;
  coordinates: [number, number];
}

export type SearchMode = 'searchto' | 'searchfrom' | 'idle';

interface LocationStore {
  locations: MapLocation[];
  filteredLocations: MapLocation[];
  searchQuery: string;
  locationFrom: undefined | MapLocation | [number, number];
  locationTo: undefined | MapLocation;
  searchMode: SearchMode;
  setRoute: (options: { locationTo?: MapLocation; locationFrom?: MapLocation }) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSearchQuery: (query: string) => void;
  filterLocations: (query: string) => void;
  clearFilteredLocations: () => void;
}

useObjectsStore.subscribe((state) => {
  // Aktualizowanie listy lokalizacji na podstawie obiektów w useObjectsStore
  useLocationStore.setState({
    locations: [
      ...useObjectsStore.getState().areaObjects.map((n, i) => ({
        ...n,
        coordinates: [Number(n.longitude), Number(n.latitude)],
      })),
      ...useObjectsStore.getState().pointObjects.map((n, i) => ({
        ...n,
        coordinates: [Number(n.longitude), Number(n.latitude)],
      })),
    ],
  });
});

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  locationFrom: undefined,
  locationTo: undefined,
  filteredLocations: [],
  searchQuery: '',
  searchMode: 'idle',
  setSearchMode: (mode: SearchMode) => {
    get().filterLocations(get().searchQuery);
    return set({ searchMode: mode });
  },
  setSearchQuery: (query) => set({ searchQuery: query }),

  filterLocations: (query) =>
    set((state) => {
      return {
        searchQuery: query,
        filteredLocations: state.locations.filter(
          (location) =>
            location.name.toLowerCase().includes(query.toLowerCase()) &&
            !(
              (state.searchMode === 'searchto' && location.id === state.locationFrom?.id) ||
              (state.searchMode === 'searchfrom' && location.id === state.locationTo?.id)
            )
        ),
      };
    }),

  clearFilteredLocations: () => set({ filteredLocations: [] }),
  setRoute: (options: { locationTo?: MapLocation; locationFrom?: MapLocation }) =>
    set((state) => {
      console.log('setroute', options);
      if (options.locationTo == options.locationFrom) return { searchMode: 'idle' };
      return {
        locationFrom: options.locationFrom ?? state.locationFrom,
        locationTo: options.locationTo ?? state.locationTo,
        searchMode: 'idle',
        searchQuery: '',
      };
    }),
}));

export default useLocationStore;
