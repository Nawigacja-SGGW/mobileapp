import { create } from 'zustand';

interface Address {
  id: number;
  street: string;
  postalCode: string;
  city: string;
}

interface Guide {
  id: number;
  description: string | null;
}

interface Entry {
  latitude: string;
  longitude: string;
}

interface ImportantPlace {
  id: number;
  floor: number;
  room: string | null;
}

interface AreaObjectFaculty {
  id: number;
  faculty: Faculty;
  floor: number | null;
}

interface Institute {
  id: number;
  name: string;
  faculty: Faculty;
}

interface Faculty {
  id: number;
  name: string;
  deansOfficeNumber: string;
}

interface MapObject {
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

interface PointObject extends MapObject {
  eventCategory: string | null;
  eventStart: Date | null;
  eventEnd: Date | null;
}

interface AreaObject extends MapObject {
  number: number | null;
  isPaid: boolean | null;
  entries: Entry[];
  importantPlaces: ImportantPlace[] | null;
  faculties: AreaObjectFaculty[] | null;
}

const fakeAreaObjects: AreaObject[] = [
  {
    latitude: '52.15751256140029',
    longitude: '21.04533087961154',
    name: 'Basen',
    type: 'Obiekt sportowy',
    description: 'Basen SGGW',
    imageUrl: null,
    website: 'http://obiektysportowe.sggw.pl/index.php/plywalnia/basen-sportowy/',
    address: {
      id: 1,
      street: 'Jana Ciszewskiego 10',
      postalCode: '02-786',
      city: 'Warszawa',
    },
    guide: null,
    number: 27,
    isPaid: false,
    entries: [
      {
        latitude: '52.157492963116354',
        longitude: '21.045311993639817',
      },
      {
        latitude: '52.15738477026233',
        longitude: '21.045143685026403',
      },
    ],
    importantPlaces: null,
    faculties: null,
  },
  {
    latitude: '52.161963648191104',
    longitude: '21.046332383073644',
    name: 'Wydział Zastosowań Informatyki i Matematyki',
    type: 'Wydział',
    description: 'Nasz wydział',
    imageUrl: null,
    website: null,
    address: {
      id: 2,
      street: 'Nowoursynowska 159/bud. 34',
      postalCode: '02-776',
      city: 'Warszawa',
    },
    guide: null,
    number: 34,
    isPaid: false,
    entries: [
      {
        latitude: '52.16223642854811',
        longitude: '21.046152023033034',
      },
      {
        latitude: '52.162163941623355,',
        longitude: ' 21.045977882304165',
      },
      {
        latitude: '52.16171375702599',
        longitude: '21.046394576191098',
      },
      {
        latitude: '52.16179578252496',
        longitude: '21.046640239005036',
      },
    ],
    importantPlaces: null,
    faculties: null,
  },
  {
    latitude: '52.16313727334748',
    longitude: '21.03888543277215',
    name: 'Dom Studencki Limba',
    type: 'Dom Studencki',
    description: null,
    imageUrl: null,
    website: null,
    address: {
      id: 3,
      street: 'Nowoursynowska 161L',
      postalCode: '02-787',
      city: 'Warszawa',
    },
    guide: null,
    number: 161,
    isPaid: false,
    entries: [
      {
        latitude: '52.16311211536585',
        longitude: '21.038731335128542',
      },
    ],
    importantPlaces: null,
    faculties: null,
  },
];

const fakePointObjects: PointObject[] = [
  {
    latitude: '52.15957117010191',
    longitude: '21.046369211223155',
    name: 'Pomnik Krowy',
    type: 'Pomnik',
    description: null,
    imageUrl: null,
    website: null,
    address: {
      id: 4,
      street: 'Nowoursynowska 166',
      postalCode: '02-787',
      city: 'Warszawa',
    },
    guide: null,
    eventCategory: null,
    eventStart: null,
    eventEnd: null,
  },
  {
    latitude: '52.15928975854478',
    longitude: '21.049575056750555',
    name: 'Jezioro',
    type: 'Przyroda',
    description: null,
    imageUrl: null,
    website: null,
    address: {
      id: 4,
      street: 'Nowoursynowska 166',
      postalCode: '02-787',
      city: 'Warszawa',
    },
    guide: null,
    eventCategory: null,
    eventStart: null,
    eventEnd: null,
  },
];

export const useFakeLocationStore = create((set) => ({
  pointObjects: [],
  areaObjects: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      set({
        pointObjects: fakePointObjects,
        areaObjects: fakeAreaObjects,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
