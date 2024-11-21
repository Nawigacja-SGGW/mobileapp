import { create } from 'zustand';

interface Guide {
  id: number;
  description: string | null;
}

interface MapObject {
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  type: string | null;
  description: string | null;
  imageUrl: string | null;
  website: string | null;
  address: Address | null;
  guide: Guide | null;
}

interface Address {
  id: number;
  street: string;
  postalCode: string;
  city: string;
}

interface PointObject extends MapObject {
  eventCategory: string | null;
  eventStart: Date | null;
  eventEnd: Date | null;
}

interface AreaObject extends MapObject {
  number: number | null;
  isPaid: boolean | null;
  faculties: AreaObjectFaculty[] | null;
  importantPlaces: ImportantPlace[] | null;
  entries: Entry[] | null;
}

interface AreaObjectFaculty {
  faculty: Faculty;
  floor: number | null;
}

interface Faculty {
  id: number;
  name: string;
  deansOfficeNumber: string;
}

interface Entry {
  latitude: string;
  longitude: string;
}

interface ImportantPlace {
  id: number;
  floor: number;
  room: number;
}

interface StoreState {
  pointObjects: PointObject[];
  areaObjects: AreaObject[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  sortedBy: (compareFn: (a: MapObject, b: MapObject) => number) => Promise<MapObject[]>;
  filteredBy: (filterFn: (a: MapObject) => boolean) => Promise<MapObject[]>;
}

const useObjectsStore = create<StoreState>((set, get) => ({
  areaObjects: [],
  pointObjects: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // TODO fetch real data
      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  sortedBy: async (compareFn: (a: MapObject, b: MapObject) => number): Promise<MapObject[]> => {
    return [...get().areaObjects, ...get().pointObjects].sort(compareFn);
  },
  filteredBy: async (filterFn: (a: MapObject) => boolean): Promise<MapObject[]> => {
    return [...get().areaObjects, ...get().pointObjects].filter(filterFn);
  },
}));

export default useObjectsStore;
