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
  importantPlaces: ImportantPlace[];
  faculties: AreaObjectFaculty[];
}


const fakePointObjects: PointObject[] = [
  {
    latitude: "52.520008",
    longitude: "13.404954",
    name: "Berlin",
    type: "City",
    description: "The capital of Germany",
];