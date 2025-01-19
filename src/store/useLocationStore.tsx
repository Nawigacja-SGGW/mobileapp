import { create } from 'zustand';
import { useGuideStore } from '~/store/useGuideStore';

export interface MapLocation {
  id: number;
  name: string;
  icon: JSX.Element;
  coordinates: [number, number];
  guide: boolean | null;
}

export type SearchMode = 'searchto' | 'searchfrom' | 'idle';
export type NavigationMode = 'routing' | 'navigating' | 'arrived' | 'guide' | 'guidePreview';

interface LocationStore {
  locations: MapLocation[];
  filteredLocations: MapLocation[];
  searchQuery: string;
  locationFrom: undefined | MapLocation | [number, number];
  locationTo: undefined | MapLocation;
  searchMode: SearchMode;
  navigationMode?: NavigationMode;
  isGuideActive: boolean;
  setNavigationMode: (mode: NavigationMode | undefined) => void;
  setRoute: (options: {
    locationTo?: MapLocation;
    locationFrom?: MapLocation;
    changeModes: boolean;
  }) => void;
  setSearchMode: (mode: SearchMode) => void;
  setSearchQuery: (query: string) => void;
  filterLocations: (query: string) => void;
  clearFilteredLocations: () => void;

  previewGuide: () => void;
  stopCampusGuide: () => void;
  startGuideNavigation: () => void;
}

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  locationFrom: undefined,
  locationTo: undefined,
  filteredLocations: [],
  searchQuery: '',
  searchMode: 'idle',
  isGuideActive: false,
  navigationMode: undefined,
  setSearchMode: (mode: SearchMode) => {
    get().filterLocations(get().searchQuery);
    return set({ searchMode: mode });
  },
  setNavigationMode: (mode: NavigationMode | undefined) => set({ navigationMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  previewGuide: () => {
    useGuideStore.getState().loadLocations();
    return set({ isGuideActive: true, navigationMode: 'guidePreview' });
  },
  startGuideNavigation: () => {
    set({ isGuideActive: true, navigationMode: 'guidePreview' });
    useGuideStore.getState().startGuideNavigation();
  },
  stopCampusGuide: () => {
    return set({ isGuideActive: false, navigationMode: undefined });
    useGuideStore.getState().stopCampusGuide();
  },

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
  setRoute: (options: {
    locationTo?: MapLocation;
    locationFrom?: MapLocation | [number, number];
    changeModes: boolean;
  }) =>
    set((state) => {
      const modes = options.changeModes
        ? {
            searchMode: 'idle',
            searchQuery: '',
            navigationMode: 'routing',
          }
        : {};
      console.log('setroute', options);
      if (options.locationTo === options.locationFrom) return { searchMode: 'idle' };

      return {
        locationFrom: options.locationFrom ?? state.locationFrom,
        locationTo: options.locationTo ?? state.locationTo,
        ...modes,
      };
    }),
}));

export default useLocationStore;
