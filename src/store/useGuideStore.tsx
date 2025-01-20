import { create } from 'zustand';

import useLocationStore, { MapLocation } from '~/store/useLocationStore';

interface GuideState {
  points: MapLocation[];
  nextPoint: number | undefined;
  getNextPoint: () => MapLocation;
  startGuideNavigation: () => void;
  skipPoint: () => void;
  loadLocations: () => void;
  stopCampusGuide: () => void;
}

export const useGuideStore = create<GuideState>((set, get) => ({
  points: [],
  nextPoint: undefined,
  loadLocations: () => {
    if (process.env.EXPO_PUBLIC_MODE === 'development') {
      set({ points: routeWaypointsIds.map((n) => useLocationStore.getState().locations[n]) });
    } else {
      set({ points: useLocationStore.getState().locations.filter((n) => n.guide) });
    }
  },
  getNextPoint: () => {
    const nextPointId = get().nextPoint ?? 0;
    return useLocationStore.getState().locations[nextPointId ?? 0];
  },
  startGuideNavigation: () => {
    set({ nextPoint: 0 });
    console.log('startGuideNavigation');
    useLocationStore.getState().setNavigationMode('guide');
    useLocationStore.getState().setRoute({ locationTo: get().points[0], changeModes: false });
  },
  skipPoint: () => {
    const state = get();
    console.log('skipPoint', state.nextPoint, (state.nextPoint ?? 0) + 1);
    console.log('skipPoint', state.points);
    const nextPoint = (state.nextPoint ?? 0) + 1;
    if (nextPoint >= state.points.length) {
      useLocationStore.getState().setRoute({ locationTo: undefined, changeModes: false });
      return;
    }
    set({ nextPoint: nextPoint });
    useLocationStore.getState().setRoute({
      locationTo: state.points[nextPoint],
      changeModes: false,
    });
  },
  stopCampusGuide: () => {
    set({ nextPoint: undefined });
    useLocationStore.getState().setRoute({ locationTo: undefined, changeModes: false });
  },
}));

// const routeWaypointsIds = [0, 1, 2, 3, 4];
const routeWaypointsIds = [1, 4, 3, 0, 2];
