import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import { ToastAndroid } from 'react-native';

import useLocationStore, { MapLocation } from '~/store/useLocationStore';
import { useRoutingApiCache } from '~/store/useRouteCache';

type RoutedBy = 'car' | 'bike' | 'foot';

function PointsDistance(point1: [number, number], point2: [number, number]): number {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  // Promień Ziemi w kilometrach
  const R = 6371;

  // Konwersja stopni na radiany
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Odległość w kilometrach
  const distance = R * c;
  return distance;
}



export function isOutsideCampus(userLocation: [number, number] | undefined): boolean {

  if (!userLocation) return false;

  const CAMPUS_CENTER: [number, number] = [21.046307578708316, 52.16363222817587]; // wspórzędne kampusu


  // console.log("userLocation");
  // console.log(userLocation);
  
  const distanceFromCampus = PointsDistance(userLocation, CAMPUS_CENTER);

  // console.log("distanceFromCampus");
  // console.log(distanceFromCampus);

  // Convert to kilometers and check if outside 1km radius
  return distanceFromCampus > 1;
}

export function usePlaceNavigation(routedBy: RoutedBy) {
  const [routeData, setRouteData] = useState({
    route: [] as [number, number][],
    distance: 0,
    duration: 0,
  });

  const [userlocation, setUserLocation] = useState<[number, number] | undefined>(undefined);
  const { navigationMode, locationTo, setNavigationMode } = useLocationStore();
  const lastLocations = useRef<[number, number][]>([]);
  const { fetchRoute } = useRoutingApiCache();



  useEffect(() => {
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

        // Add check for campus proximity
        if (isOutsideCampus(coords)) {
          ToastAndroid.show(
            'You are outside the campus area (>1km from center)', 
            ToastAndroid.LONG
          );
        }
      }
    );
  }, []);  

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

  //apka nie będzie nas nawigować gdy jesteśmy za daleko od kampusu
  useEffect(() => {
    if (navigationMode !== 'navigating' && navigationMode !== 'routing') return;
    console.log('uloc, toloc', userlocation, locationTo);
    let locfrom = userlocation;
    let locto = locationTo;
    if (!userlocation || !locationTo) return;

    // Sprawdzamy czy użytkownik jest poza kampusem przed próbą wyznaczenia trasy
    if (isOutsideCampus(userlocation)) {
      ToastAndroid.show(
          'Cannot calculate route - you are outside the campus area', 
          ToastAndroid.LONG
      );
      setNavigationMode('idle'); // Przerywamy nawigację/routing
      setRouteData({  // Czyścimy dane trasy
          route: [],
          distance: 0,
          duration: 0
      });
      return;
  }


    if (!Array.isArray(locto)) locto = locationTo.coordinates;
    const wayString = [locfrom, locto].reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (1 === i ? '' : ';');
      return acc;
    }, '');
    if (mapDistance(userlocation, locationTo) < 0.02) {
      console.log('ARRIVED');
      ToastAndroid.show('Arrived at destination', ToastAndroid.SHORT);
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
      fetchRoute(routedBy, wayString).then((n) => {
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

  useEffect(() => {
    lastLocations.current = [];
  }, [locationTo]);

  useEffect(() => {
    if (navigationMode !== 'navigating') {
      setRouteData((n) => ({
        ...n,
        route: [],
      }));
    }
  }, [navigationMode]);

  if (routeData.distance === 0) {
    console.log({
      route: routeData.route,
      distance: routeData.distance,
      duration: routeData.duration,
      userLocation: userlocation,
    });
    console.log('routedata zero');
  }

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
  return [...fullRoute.slice(closestIndex)];
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
