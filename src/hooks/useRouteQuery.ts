import { useEffect, useState } from 'react';

type RoutedBy = 'car' | 'bike' | 'foot';
export function useRouteQuery(waypoints: [number, number][], routedBy: RoutedBy) {
  const [routeData, setRouteData] = useState({
    route: [],
    distance: 0,
    duration: 0,
  });

  useEffect(() => {
    console.log("useRouteQuery.ts waypoints")
    console.log(waypoints);
    if (waypoints.length < 2 || waypoints.filter(Boolean).length < waypoints.length) return;
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
          distance: n['distance'],
          duration: n['duration'],
        });
      });
  }, [waypoints]);
  return {
    route: routeData.route,
    distance: routeData.distance,
    duration: routeData.duration,
  } as const;
}
