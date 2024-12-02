import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';

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
          timeInterval: 10,
          distanceInterval: 1,
        },
        (location) => {
          // if (navigationMode !== 'routing') return;
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
    console.log('uloc, toloc', userlocation, locationTo);
    let locfrom = userlocation;
    let locto = locationTo;
    if (!userlocation || !locationTo) return;
    if (!Array.isArray(locto)) locto = locationTo.coordinates;
    const waypoints = [locfrom, locto];
    const wayString = [locfrom, locto].reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (1 === i ? '' : ';');
      return acc;
    }, '');
    if (mapDistance(userlocation, locationTo) < 0.02) {
      console.log('ARRIVED');
      setNavigationMode('arrived');
    }
    if (
      lastLocations.current.length === 0 ||
      mapDistance(lastLocations.current[0], userlocation) > 0.01
    )
      fetch(
        `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
      )
        .then((n) => n.json())
        .then((n) => {
          console.log(n);
          console.log(n['routes'][0].geometry.coordinates);
          if (navigationMode !== 'navigating') return;
          setRouteData({
            route: n['routes'][0].geometry.coordinates,
            distance: n['routes'][0].distance,
            duration: n['duration'],
          });
        });
    else {
      let r = getRemainingRoute(routeData.route, userlocation, lastLocations.current ?? []);
      setRouteData({
        ...routeData,
        route: r,
        distance: calculateDistance(r),
      });
    }
    console.log('routedata', routeData, lastLocations, userlocation);
  }, [locationTo, userlocation]);

  return {
    route: getRemainingRoute(routeData.route, userlocation, lastLocations.current ?? []),
    distance: routeData.distance,
    duration: routeData.duration,
  } as const;
}

const findClosestPointIndex = (route, location, previousLocations) => {
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

const getRemainingRoute = (
  fullRoute: [number, number][],
  previousLocations: [number, number][],
  currentLocation?: [number, number]
): [number, number][] => {
  if (true) return fullRoute;
  const closestIndex = findClosestPointIndex(fullRoute, currentLocation, previousLocations ?? []);

  const isMovingForward = (() => {
    if (!previousLocations || previousLocations.length < 2) return true; // Domyślnie idziemy naprzód
    const lastPoint = previousLocations[previousLocations.length - 1];
    const secondLastPoint = previousLocations[previousLocations.length - 2];

    const distanceToNext = mapDistance(lastPoint, fullRoute[closestIndex + 1] ?? []);
    const distanceToPrev = mapDistance(lastPoint, fullRoute[closestIndex - 1] ?? []);

    return distanceToNext < distanceToPrev;
  })();

  console.log('forward');
  // sort route, get best, sort route by previous path
  const prevLocation = previousLocations?.at(-1);
  if (prevLocation) return [prevLocation, ...fullRoute.slice(closestIndex)];
  else return [...fullRoute.slice(closestIndex)].filter(Boolean);
};

const mapDistance = (
  location1: [number, number] | MapLocation | undefined,
  location2: [number, number] | MapLocation | undefined
): number => {
  console.log(location1, location2);
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

function calculateDistance(points: [number, number][]) {
  let distance: number = 0;
  for (let i = 0; i < points.length - 1; i++) {
    distance += mapDistance(points[i], points[i + 1]);
  }
  return distance;
}
