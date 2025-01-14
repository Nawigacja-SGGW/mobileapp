import { create } from 'zustand';

import { MapLocation } from '~/store/useLocationStore';

interface GuideStore {
  points: MapLocation;
  nextPointId: MapLocation|undefined;
  getNextPoint: () => MapLocation;
  switchNextPoint: () => void;
}

const useGuideStore = create<GuideStore>((get, set) => ({
  points: [],
  nextPointId: undefined,
}));
