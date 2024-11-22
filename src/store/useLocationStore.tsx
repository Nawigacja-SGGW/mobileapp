import { ReactNode } from 'react';
import { create } from 'zustand';
import BookIcon from '../../assets/book1.svg';
import BuildingIcon from '../../assets/building3.svg';
import { fakeAreaObjects, fakePointObjects } from '~/store/useObjectsStore';

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

const initialLocations2 = [
  ...fakeAreaObjects.map((n, i) => ({
    ...n,
    coordinates: [Number(n.longitude), Number(n.latitude)],
    id: i + 1000,
  })),
  ...fakePointObjects.map((n, i) => ({
    ...n,
    coordinates: [Number(n.longitude), Number(n.latitude)],
    id: i + 2001,
  })),
];
console.log('initialLocations2', initialLocations2);

const initialLocations: MapLocation[] = [
  {
    id: 1,
    name: 'Basen',
    icon: <BuildingIcon width={24} height={24} />,
    coordinates: [21.0465, 52.1674],
  },
  {
    id: 2,
    name: 'Biblioteka Główna',
    icon: <BookIcon width={24} height={24} />,
    coordinates: [21.0487, 52.1643],
  },
  {
    id: 3,
    name: 'Biblioteka przy Instytucie Inżynierii',
    icon: <BookIcon width={24} height={24} />,
    coordinates: [21.0458, 52.1658],
  },
  {
    id: 4,
    name: 'Biblioteka przy Instytucie Medycyny',
    icon: <BookIcon width={24} height={24} />,
    coordinates: [21.0436, 52.1627],
  },
  {
    id: 5,
    name: 'Biblioteka przy Instytucie Nauk o Zdrowiu',
    icon: <BookIcon width={24} height={24} />,
    coordinates: [21.0419, 52.1612],
  },
];

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: initialLocations2,
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
