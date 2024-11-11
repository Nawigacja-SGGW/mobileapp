import { ReactNode } from 'react';
import { create } from 'zustand';
import BookIcon from '../../assets/book1.svg';
import BuildingIcon from '../../assets/building3.svg';

interface Location {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface LocationStore {
  locations: Location[];
  filteredLocations: Location[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterLocations: (query: string) => void;
  clearFilteredLocations: () => void;
}

const initialLocations: Location[] = [
  { id: 1, name: 'Basen', icon: <BuildingIcon width={24} height={24} /> },
  { id: 2, name: 'Biblioteka Główna', icon: <BookIcon width={24} height={24} /> },
  { id: 3, name: 'Biblioteka przy Instytucie Inżynierii', icon: <BookIcon width={24} height={24} /> },
  { id: 4, name: 'Biblioteka przy Instytucie Medycyny', icon: <BookIcon width={24} height={24} /> },
  { id: 5, name: 'Biblioteka przy Instytucie Nauk o Zdrowiu', icon: <BookIcon width={24} height={24} /> },
];

const useLocationStore = create<LocationStore>((set) => ({
  locations: initialLocations,
  filteredLocations: [],
  searchQuery: '',
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  filterLocations: (query) => set((state) => ({
    searchQuery: query,
    filteredLocations: state.locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    ),
  })),

  clearFilteredLocations: () => set({ filteredLocations: [] }),
}));

export default useLocationStore;
