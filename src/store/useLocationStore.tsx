import { ReactNode } from 'react';
import { create } from 'zustand';
import BookIcon from '../../assets/book1.svg';
import BuildingIcon from '../../assets/building3.svg';

export interface MapLocation {
  id: number;
  name: string;
  icon: JSX.Element;
  coordinates: [number, number];
}

interface LocationStore {
  locations: MapLocation[];
  filteredLocations: MapLocation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterLocations: (query: string) => void;
  clearFilteredLocations: () => void;
}

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

const useLocationStore = create<LocationStore>((set) => ({
  locations: initialLocations,
  filteredLocations: [],
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),

  filterLocations: (query) =>
    set((state) => ({
      searchQuery: query,
      filteredLocations: state.locations.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      ),
    })),

  clearFilteredLocations: () => set({ filteredLocations: [] }),
}));

export default useLocationStore;
