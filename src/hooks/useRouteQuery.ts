import { useEffect, useMemo, useState } from 'react';

import useLocationStore from '~/store/useLocationStore';

type RoutedBy = 'car' | 'bike' | 'foot';
export function useRouteQuery(
  // locationFrom: MapLocation | undefined | [number, number],
  // locationTo: MapLocation | undefined | [number, number],
  routedBy: RoutedBy
) {
  const { locationFrom, locationTo } = useLocationStore();
  const [routeData, setRouteData] = useState({
    route: [],
    distance: 0,
    duration: 0,
  });

  const query = useMemo(
    () => [locationFrom, locationTo, routedBy],
    [locationFrom, locationTo, routedBy]
  );

  useEffect(() => {
    console.log({ locationFrom, locationTo });
    let locfrom = locationFrom;
    let locto = locationTo;
    if (!locationFrom) {
    }
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

    fetch(
      `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    )
      .then((n) => n.json())
      .then((n) => {
        //console.log(n);
        //console.log(n['routes'][0].geometry.coordinates);
        setRouteData({
          route: n['routes'][0].geometry.coordinates,
          distance: n['routes'][0]['distance'],
          duration: n['duration'],
        });
      });
  }, [locationFrom, locationTo, routedBy]);
  return routeData;
}
