import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import useLocationStore from '~/store/useLocationStore';

type RoutedBy = 'car' | 'bike' | 'foot';

export function usePlaceNavigation(routedBy: RoutedBy) {
  const [routeData, setRouteData] = useState({
    route: [],
    distance: 0,
    duration: 0,
  });

  const [userlocation, setUserLocation] = useState();
  const { navigationMode, locationTo } = useLocationStore();
  const lastLocations = useRef([]);

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
          timeInterval: 100,
          distanceInterval: 1,
        },
        (location) => {
          const coords = [location.coords.longitude, location.coords.latitude];
          lastLocations.current.push(coords);
          if (lastLocations.current.length > 10) lastLocations.current.shift();
          setUserLocation(coords);
          console.log(location);
        }
      );

      const location = await Location.getCurrentPositionAsync({});
      const coords = [location.coords.longitude, location.coords.latitude];
      setUserLocation(coords);
      console.log(userlocation);
    })();
  }, []);

  useEffect(() => {
    console.log('uloc, toloc', userlocation, locationTo);

    let locfrom = userlocation;
    let locto = locationTo;
    if (!userlocation || !locationTo) return;
    if (!Array.isArray(userlocation)) locfrom = userlocation.coordinates;
    if (!Array.isArray(locationTo)) locto = locationTo.coordinates;
    const waypoints = [locfrom, locto];
    const wayString = [locfrom, locto].reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (1 === i ? '' : ';');
      return acc;
    }, '');
    if (mapDistance(lastLocations.current[0], userlocation) > 0.01)
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
            distance: n['distance'],
            duration: n['duration'],
          });
        });
  }, [locationTo, userlocation]);

  return {
    route: getRemainingRoute(routeData.route, userlocation, lastLocations.current),
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
  if (
    previousLocations &&
    mapDistance(previousLocations.at(-1), route[closestIndex]) &&
    closestIndex < route.length - 1
  ) {
    closestIndex += 1;
  }

  return closestIndex;
};

const getRemainingRoute = (fullRoute, currentLocation, previousLocations) => {
  // 1. Znajdź najbliższy punkt na trasie
  const closestIndex = findClosestPointIndex(fullRoute, currentLocation);

  // 2. Sprawdź kierunek ruchu użytkownika
  const isMovingForward = (() => {
    if (previousLocations.length < 2) return true; // Domyślnie idziemy naprzód
    const lastPoint = previousLocations[previousLocations.length - 1];
    const secondLastPoint = previousLocations[previousLocations.length - 2];

    const distanceToNext = mapDistance(lastPoint, fullRoute[closestIndex + 1] || []);
    const distanceToPrev = mapDistance(lastPoint, fullRoute[closestIndex - 1] || []);

    return distanceToNext < distanceToPrev;
  })();

  // 3. Wytnij trasę w zależności od kierunku ruchu
  //
  // if (isMovingForward) {
  console.log('forward');
  return [previousLocations.at(-1), ...fullRoute.slice(closestIndex)];
  // } else {
  //   console.log('backward');
  //   return fullRoute.slice(0, closestIndex + 1);
  // }
};

const mapDistance = (
  location1: [number, number] | MapLocation,
  location2: [number, number] | MapLocation
): number => {
  if (!location1 || !location2) return 0;
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
