import api from 'api';
import { create, StoreApi, UseBoundStore } from 'zustand';
import {PointObject} from '~/store/useObjectsStore';

const fakeEvents: PointObject[] = [
  {
    id: 4,
    latitude: '52.15957117010191',
    longitude: '21.046369211223155',
    name: 'Dojenie krowy',
    nameEng: "Milking a cow",
    type: 'Pomnik',
    description: "Dojenie krowy pod pomnikiem krowy.",
    descriptionEng: "Milking a cow next to cow's Monument.",
    imageUrl: null,
    website: null,
    address: {
        id: 4,
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
    id: 5,
    latitude: '52.15928975854478',
    longitude: '21.049575056750555',
    name: 'Wiosenna kąpiel w jeziorze',
    nameEng: 'Spring bath in the lake',
    type: 'Przyroda',
    description: "Wiosenna kąpiel w jeziorze. Zapraszamy wszystkich lubiących wodę.",
    descriptionEng: "Spring bath in the lake. Everyone liking water is welcomed.",
    imageUrl: null,
    website: null,
    address: {
      id: 4,
      street: 'Nowoursynowska 166',
      postalCode: '02-787',
      city: 'Warszawa',
      cityEng: 'Warsaw',
    },
    guide: null,
    eventCategory: "student activity",
    eventStart: new Date("2025-05-01T9:00:00"),
    eventEnd: new Date("2025-05-01T12:00:00"),
  },
  {
    id: 1,
    latitude: '52.161963648191104',
    longitude: '21.046332383073644',
    name: 'Hekaton Hackarea',
    nameEng: 'Heckaton Hackarea',
    type: 'Wydział',
    description: 'Nasz wydział',
    descriptionEng: 'Our department',
    imageUrl: null,
    website: null,
    address: {
      id: 2,
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
]

interface StoreState {
  objects: PointObject[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  getEvents: () => PointObject[];
}

type FetchDataResponse = {
  code: number;
  objects: PointObject[];
};

const useRealEvents = create<StoreState>((set, get) => ({
  objects: [],
  loading: false,
  error: null,

  fetchData: async () => {
    const response = await api.get<FetchDataResponse>('/objects');
    set({
        objects: response.data.objects,
        loading: false,
        error: null,
    });
    return Promise.resolve();
  },
  getEvents: (): PointObject[] => {
    return [...get().objects].filter(x => x.eventCategory != null && x.eventStart != null);
  }
}));

const useFakeEvents = create<StoreState>((set, get) => ({
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
  getEvents: (): PointObject[] => {
    return [...get().objects].filter(x => x.eventCategory != null && x.eventStart != null);
  }
}));

export let useEvents: UseBoundStore<StoreApi<StoreState>>;

if (process.env.EXPO_PUBLIC_MODE === 'development') useEvents = useFakeEvents;
else useEvents = useRealEvents;