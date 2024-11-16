import '../../global.css';
import '../../translation';
import Drawer from 'expo-router/drawer';

import { DrawerMenu } from '~/components/Menu';

export default function Layout() {
  return (
    <Drawer
      drawerContent={() => <DrawerMenu />}
      screenOptions={{ drawerStyle: { width: '100%', backgroundColor: '#003228' } }}
    />
  );
}
