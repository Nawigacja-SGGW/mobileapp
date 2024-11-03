import { useEffect, useState } from 'react';

export function useRouteQuery(waypoints: [number, number][]) {
  const [route, setRoute] = useState([]);
  useEffect(() => {
    console.log(waypoints);
    if (waypoints.length < 2) return;
    const wayString = waypoints.reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
      return acc;
    }, '');

    console.log(
      `http://router.project-osrm.org/route/v1/walking/${wayString}?overview=full&geometries=geojson`
    );

    fetch(
      `http://router.project-osrm.org/route/v1/walking/${wayString}?overview=full&geometries=geojson`
    )
      .then((n) => n.json())
      .then((n) => {
        console.log(n['routes'][0].geometry.coordinates);
        setRoute(n['routes'][0].geometry.coordinates);
      });
  }, [waypoints]);
  return route;
}
