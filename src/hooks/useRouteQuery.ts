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

  const query = useMemo(
    () => [locationFrom, locationTo, routedBy],
    [locationFrom, locationTo, routedBy]
  );

  // const routeQuery = useMemo(async () => {
  //   let [lf, lt, rb] = query;
  //
  //   console.log(locationFrom, locationTo);
  //
  //   if (!locationFrom || !locationTo) return [];
  //
  //   let locTo = locationTo;
  //   let locFrom = locationFrom;
  //   if (!Array.isArray(locationFrom)) locFrom = locFrom.coordinates;
  //   if (!Array.isArray(locationTo)) locTo = locationTo.coordinates;
  //
  //   const waypoints = [locationFrom, locationTo];
  //   const wayString = waypoints.reduce((acc, c, i) => {
  //     acc += c[0].toString() + ',';
  //     acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
  //     return acc;
  //   }, '');
  //   let result = await fetch(
  //     `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
  //   );
  //   result = await result.json();
  //   console.log('result', result);
  //   console.log(result);
  //   return {
  //     route: result['routes'][0].geometry.coordinates,
  //     distance: result['distance'],
  //     duration: result['duration'],
  //   };
  // }, [query]);

  useEffect(() => {
    let locfrom = locationFrom;
    let locto = locationTo;
    if (!locationFrom || !locationTo) return;
    if (!Array.isArray(locationFrom)) locfrom = locationFrom.coordinates;
    if (!Array.isArray(locationTo)) locto = locationTo.coordinates;
    const waypoints = [locfrom, locto];
    console.log(waypoints);

    const wayString = waypoints.reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
      return acc;
    }, '');
    console.log(
      'siema eloe leoeokfjesdkfjdskljdfklgj',
      wayString,
      `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    );

    fetch(
      `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    )
      .then((n) => n.json())
      .then((n) => {
        //console.log(n);
        //console.log(n['routes'][0].geometry.coordinates);
        setRouteData({
          route: n['routes'][0].geometry.coordinates,
          distance: n['distance'],
          duration: n['duration'],
        });
      });
  }, [locationFrom, locationTo, routedBy]);
  return routeData;
  // return {
  //   route: routeData.route,
  //   distance: routeData.distance,
  //   duration: routeData.duration,
  // } as const;
}
