import { useEffect, useMemo, useState } from 'react';
import useLocationStore, { MapLocation } from '~/store/useLocationStore';

type RoutedBy = 'car' | 'bike' | 'foot';
export function useRouteQuery(
  // locationFrom: MapLocation | undefined | [number, number],
  // locationTo: MapLocation | undefined | [number, number],
  routedBy: RoutedBy
) {
  const { locationFrom, locationTo } = useLocationStore();
  console.log('routeQuery invocation', locationTo, locationFrom);
  const [routeData, setRouteData] = useState({
    route: [],
    distance: 0,
    duration: 0,
  });

  const routeQuery = useMemo(async () => {
    console.log(waypoints);

    if (!locationFrom || !locationTo) return;
    let locTo = locationTo;
    let locFrom = locationFrom;
    if (!Array.isArray(locationFrom)) locFrom = locFrom.coordinates;
    if (!Array.isArray(locationTo)) locTo = locationTo.coordinates;

    const waypoints = [locationFrom, locationTo];
    const wayString = waypoints.reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
      return acc;
    }, '');
    let result = await fetch(
      `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    );
    result = await result.json();
    console.log('result', result);
    console.log(result);
    return {
      route: result['routes'][0].geometry.coordinates,
      distance: result['distance'],
      duration: result['duration'],
    };
  }, [locationFrom, locationTo, routedBy]);

  // useEffect(() => {
  //   const waypoints = [locationFrom, locationTo];
  //   console.log(waypoints);
  //
  //   if (!locationFrom || !locationTo) return;
  //   if (locationFrom instanceof Object) locationTo = locationTo.coordinates;
  //   if (locationTo instanceof Object) locationTo = locationTo.coordinates;
  //   const wayString = waypoints.reduce((acc, c, i) => {
  //     acc += c[0].toString() + ',';
  //     acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
  //     return acc;
  //   }, '');
  //
  //   fetch(
  //     `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
  //   )
  //     .then((n) => n.json())
  //     .then((n) => {
  //       console.log(n);
  //       console.log(n['routes'][0].geometry.coordinates);
  //       setRouteData({
  //         route: n['routes'][0].geometry.coordinates,
  //         distance: n['distance'],
  //         duration: n['duration'],
  //       });
  //     });
  // }, []);
  return routeQuery;
  // return {
  //   route: routeData.route,
  //   distance: routeData.distance,
  //   duration: routeData.duration,
  // } as const;
}
