import { useEffect, useMemo, useState } from 'react';
import { useGuideStore } from '~/store/useGuideStore';

import useLocationStore from '~/store/useLocationStore';
import { useRoutingApiCache } from '~/store/useRouteCache';

type RoutedBy = 'car' | 'bike' | 'foot';
export function useRouteQuery(
  // locationFrom: MapLocation | undefined | [number, number],
  // locationTo: MapLocation | undefined | [number, number],
  routedBy: RoutedBy
) {
  const { locationFrom, locationTo, navigationMode } = useLocationStore();
  const { points } = useGuideStore();
  const { fetchRoute } = useRoutingApiCache();

  const [routeData, setRouteData] = useState({
    isLoading: false,
    isError: false,
    route: [],
    distance: 0,
    duration: 0,
  });

  useEffect(() => {
    if (navigationMode === 'guidePreview') {
      const waypoints = points.map((n) => n.coordinates);
      if (points.length < 1) {
        return;
      }
      setRouteData({ isLoading: true, isError: false, route: [], distance: 0, duration: 0 });
      try {
        const wayString = waypoints.reduce((acc, c, i) => {
          acc += c[0].toString() + ',';
          acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
          return acc;
        }, '');
        fetchRoute('foot', wayString).then((n) => {
          setRouteData({
            isLoading: false,
            isError: false,
            route: n['routes'][0].geometry.coordinates,
            distance: n['routes'][0]['distance'],
            duration: n['duration'],
          });
        });
      } catch (error) {
        setRouteData({ isLoading: false, isError: true, route: [], distance: 0, duration: 0 });
        throw error;
      }
      return;
    }
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
    console.log(useLocationStore.getState());

    const wayString = waypoints.reduce((acc, c, i) => {
      acc += c[0].toString() + ',';
      acc += c[1].toString() + (waypoints.length - 1 === i ? '' : ';');
      return acc;
    }, '');

    setRouteData({ isLoading: true, isError: false, route: [], distance: 0, duration: 0 });
    try {
      fetchRoute(routedBy, wayString).then((n) => {
        setRouteData({
          isLoading: false,
          isError: false,
          route: n['routes'][0].geometry.coordinates,
          distance: n['routes'][0]['distance'],
          duration: n['duration'],
        });
      });
    } catch (error) {
      setRouteData({ isLoading: false, isError: true, route: [], distance: 0, duration: 0 });
      throw error;
    }

    // fetch(
    //   `https://routing.openstreetmap.de/routed-${routedBy}/route/v1/foot/${wayString}?overview=full&geometries=geojson`
    // )
    //   .then((n) => n.json())
    //   .then((n) => {
    //     //console.log(n);
    //     //console.log(n['routes'][0].geometry.coordinates);
    //     setRouteData({
    //       route: n['routes'][0].geometry.coordinates,
    //       distance: n['routes'][0]['distance'],
    //       duration: n['duration'],
    //     });
    //   });
  }, [locationFrom, locationTo, routedBy, navigationMode]);
  return routeData;
}
