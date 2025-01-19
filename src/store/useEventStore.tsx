import api from 'api';
import { create, StoreApi, UseBoundStore } from 'zustand';
import {PointObject} from '~/store/useObjectsStore';

const fakeEvents: PointObject[] = [
  {
    id: 1,
    latitude: '52.15957117010191',
    longitude: '21.046369211223155',
    name: 'Pomnik krowy',
    nameEng: "Cow's monument",
    type: 'Pomnik',
    description: "Dojenie krowy pod pomnikiem krowy.",
    descriptionEng: "Milking a cow next to cow's Monument.",
    imageUrl: null,
    website: null,
    address: {
        id: 2,
        street: 'Nowoursynowska 166',
        postalCode: '02-787',
        city: 'Warszawa',
        cityEng: 'Warsaw',
    },
    guide: null,
    eventCategory: "student activity",
    eventStart: new Date("2025-04-06T12:00:00"),
    eventEnd: new Date("2025-04-06T14:00:00")
  },
  {
    id: 3,
    latitude: '52.15928975854478',
    longitude: '21.049575056750555',
    name: 'Jezioro',
    nameEng: 'Lake',
    type: 'Przyroda',
    description: "Wiosenna kąpiel w jeziorze. Zapraszamy wszystkich lubiących wodę.",
    descriptionEng: "Spring bath in the lake. Everyone liking water is welcomed.",
    imageUrl: null,
    website: null,
    address: {
      id: 5,
      street: 'Nowoursynowska 166',
      postalCode: '02-787',
      city: 'Warszawa',
      cityEng: 'Warsaw',
    },
    guide: null,
    eventCategory: "student activity",
    eventStart: new Date("2025-05-01T11:00:00"),
    eventEnd: new Date("2025-05-02T18:00:00"),
  },
  {
    id: 4,
    latitude: '52.161963648191104',
    longitude: '21.046332383073644',
    name: 'Wydział WZIM',
    nameEng: 'WZIM department',
    type: 'Wydział',
    description: 'Hekaton Hackarea',
    descriptionEng: 'Heckaton Hackarea',
    imageUrl: null,
    website: null,
    address: {
      id: 6,
      street: 'Nowoursynowska 159/bud. 34',
      postalCode: '02-776',
      city: 'Warszawa',
      cityEng: 'Warsaw',
    },
    guide: null,
    eventCategory: "heckaton",
    eventStart: new Date("2025-05-01T9:00:00"),
    eventEnd: new Date("2025-05-01T12:00:00"),
  },
  {
    id: 7,
    latitude: '52.161963648191104',
    longitude: '21.046332383073644',
    name: 'Wydział WZIM',
    nameEng: 'WZIM department',
    type: 'Wydział',
    description: 'Ćwiczenia strzeleckie i przysposobienia obronnego studentów SGGW.',
    descriptionEng: 'Shooting exercises and defense training for SGGW students.',
    imageUrl: null,
    website: null,
    address: {
      id: 8,
      street: 'Nowoursynowska 159/bud. 34',
      postalCode: '02-776',
      city: 'Warszawa',
      cityEng: 'Warsaw',
    },
    guide: null,
    eventCategory: "training",
    eventStart: new Date("2025-04-27T8:00:00"),
    eventEnd: null,
  },
];

interface StoreState {
  objects: PointObject[];
  loading: boolean;
  error: string | null;

  fetchData: () => Promise<void>;
  sortedByDate: () => PointObject[];
  sortedByLocation: () => PointObject[];
  sortedByCategory: () => PointObject[];
  filterSearch: (searchQuery :string) => PointObject[];
}

type FetchDataResponse = {
  code: number;
  objects: PointObject[];
};

const useRealEventStore = create<StoreState>((set, get) => ({
  objects: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<FetchDataResponse>('/objects');
      const eventsObjects = response.data.objects.filter ((x) => x.eventCategory != null && x.eventStart != null);

      set({
        objects: eventsObjects,
        loading: false,
        error: null,
      });
      return Promise.resolve();
    }
    catch(error) {
      set({ error: (error as Error).message, loading: false });
      return Promise.reject(error);
    }
  },
  sortedByDate: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => new Date(a.eventStart!).getTime() - new Date(b.eventStart!).getTime()
    );
  },
  sortedByLocation: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  },
  sortedByCategory: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => a.eventCategory!.toLowerCase().localeCompare(b.eventCategory!.toLowerCase())
    );
  },
  filterSearch: (searchQuery): PointObject[] => {
    return [...get().objects].filter(
      (x) => x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}));

const useFakeEventStore = create<StoreState>((set, get) => ({
  objects: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        objects: fakeEvents,
        loading: false,
        error: null,
      });
      return Promise.resolve();
    } 
    catch (error) {
      set({ error: (error as Error).message, loading: false });
      return Promise.reject(error);
    }
  },
  sortedByDate: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => new Date(a.eventStart!).getTime() - new Date(b.eventStart!).getTime()
    );
  },
  sortedByLocation: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  },
  sortedByCategory: (): PointObject[] => {
    return [...get().objects].sort(
      (a, b) => a.eventCategory!.toLowerCase().localeCompare(b.eventCategory!.toLowerCase())
    );
  },
  filterSearch: (searchQuery): PointObject[] => {
    return [...get().objects].filter(
      (x) => x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}));

export let useEventStore: UseBoundStore<StoreApi<StoreState>>;

if (process.env.EXPO_PUBLIC_MODE === 'development') {
  useEventStore = useFakeEventStore;
  console.log("Using Fake Events");
}
else {
  useEventStore = useRealEventStore;
  console.log("Using Real Events");
}