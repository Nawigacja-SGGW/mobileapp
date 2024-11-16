import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type RoutedBy = 'car' | 'bike' | 'foot';
export function useRouteQuery(
  locationTo?: [number, number],
  routedBy: RoutedBy,
  navigationMode?: 'routing' | 'navigating'
) {
  const [routeData, setRouteData] = useState({
    route: [],
    distance: 0,
    duration: 0,
  });

  const [userlocation, setUserLocation] = useState();

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
          timeInterval: 1000,
        },
        (location) => {
          setUserLocation(location);
          console.log(location);
        }
      );

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      console.log(userlocation);
    })();
  }, []);

  useEffect(() => {
    console.log(waypoints);
    if (!userlocation) return;
    const wayString = [userlocation, locationTo].reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
      return acc;
    }, '');

    fetch(
      `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    )
      .then((n) => n.json())
      .then((n) => {
        console.log(n);
        console.log(n['routes'][0].geometry.coordinates);
        setRouteData({
          route: n['routes'][0].geometry.coordinates,
          distance: n['distance'],
          duration: n['duration'],
        });
      });
  }, [locationTo, userlocation]);
  return {
    route: routeData.route,
    distance: routeData.distance,
    duration: routeData.duration,
  } as const;
}
