import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import { ToastAndroid } from 'react-native';

import useLocationStore, { MapLocation } from '~/store/useLocationStore';

type RoutedBy = 'car' | 'bike' | 'foot';

export function usePlaceNavigation(routedBy: RoutedBy) {
  const [routeData, setRouteData] = useState({
    route: [] as [number, number][],
    distance: 0,
    duration: 0,
  });

  const [userlocation, setUserLocation] = useState<[number, number] | undefined>(undefined);
  const { navigationMode, locationTo, setNavigationMode } = useLocationStore();
  const lastLocations = useRef<[number, number][]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('no location');
        return;
      }
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 5,
        },
        (location) => {
          const coords = [location.coords.longitude, location.coords.latitude] as [number, number];
          lastLocations.current.push(coords);
          if (lastLocations.current.length > 10) lastLocations.current.shift();
          setUserLocation(coords);
          console.log(location);
        }
      );

      const location = await Location.getCurrentPositionAsync({});
      const coords = [location.coords.longitude, location.coords.latitude] as [number, number];
      setUserLocation(coords);
      console.log(userlocation);
    })();
  }, []);

  useEffect(() => {
    if (navigationMode !== 'navigating') return;
    console.log('uloc, toloc', userlocation, locationTo);
    let locfrom = userlocation;
    let locto = locationTo;
    if (!userlocation || !locationTo) return;
    if (!Array.isArray(locto)) locto = locationTo.coordinates;
    const wayString = [locfrom, locto].reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (1 === i ? '' : ';');
      return acc;
    }, '');
    if (mapDistance(userlocation, locationTo) < 0.02) {
      console.log('ARRIVED');
      ToastAndroid.show("Arrived at destination");
      setNavigationMode('arrived');
    }
    if (
      lastLocations.current.length === 0 ||
      mapDistance(lastLocations.current[0], userlocation) > 0.01
    ) {
      console.log(
        'fetching',
        lastLocations.current,
        mapDistance(lastLocations.current[0], userlocation)
      );
      fetch(
        `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
      )
        .then((n) => n.json())
        .then((n) => {
          console.log(n, lastLocations.current);
          console.log(n['routes'][0].geometry.coordinates);
          setRouteData({
            route: n['routes'][0].geometry.coordinates,
            distance: n['routes'][0].distance,
            duration: n['duration'],
          });
        });
    } else {
      const r = getRemainingRoute({
        fullRoute: routeData.route,
        currentLocation: userlocation,
        previousLocations: lastLocations.current ?? [],
      });
      console.log('getRemainingRoute', r);
      setRouteData({
        ...routeData,
        route: r,
        distance: calculateDistance(r),
      });
    }
    console.log('routedata', routeData, lastLocations, userlocation);
  }, [locationTo, navigationMode === 'navigating' ? userlocation : undefined, navigationMode]);

  return {
    route: routeData.route,
    distance: routeData.distance,
    duration: routeData.duration,
    userLocation: userlocation,
  } as const;
}

const findClosestPointIndex = (route: [number, number][], location, previousLocations) => {
  let closestIndex = 0;
  let minDistance = Infinity;

  route.forEach((point, index) => {
    const distance = mapDistance(point, location);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  });
  if (minDistance > 0.1) return route;

  if (
    previousLocations &&
    mapDistance(previousLocations.at(-1), route[closestIndex]) &&
    closestIndex < route.length - 1
  ) {
    closestIndex += 1;
  }

  return closestIndex;
};

const getRemainingRoute = ({
  fullRoute,
  previousLocations,
  currentLocation,
}: {
  fullRoute: [number, number][];
  previousLocations: [number, number][];
  currentLocation?: [number, number];
}): [number, number][] => {
  console.log({ fullRoute, previousLocations, currentLocation });
  if (!fullRoute || fullRoute.length === 0) return [];
  const closestIndex = findClosestPointIndex(fullRoute, currentLocation, previousLocations ?? []);
  const prevLocation = previousLocations?.at(-1);
  if (prevLocation) return [prevLocation, ...fullRoute.slice(closestIndex)];
  return [...fullRoute.slice(closestIndex)].filter(Boolean);
};

const mapDistance = (
  location1: [number, number] | MapLocation | undefined,
  location2: [number, number] | MapLocation | undefined
): number => {
  if (!location1 || !location2) return 0;
  if (
    [location2, location1].filter(
      (n) => (Array.isArray(n) && n.length === 2) || typeof n === 'object'
    ).length !== 2
  ) {
    return 0;
  }
  const [lat1, lon1] = Array.isArray(location1) ? location1 : location1.coordinates;
  const [lat2, lon2] = Array.isArray(location2) ? location2 : location2.coordinates;

  const toRad = (deg: number) => (deg * Math.PI) / 180,
    R = 6371;
  const [dLat, dLon] = [toRad(lat2 - lat1), toRad(lon2 - lon1)];
  return (
    R *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
      )
    )
  );
};

function calculateDistance(route: [number, number][]) {
  let distance: number = 0;
  for (let i = 0; i < route.length - 1; i++) {
    distance += mapDistance(route[i], route[i + 1]);
  }
  return distance;
}
