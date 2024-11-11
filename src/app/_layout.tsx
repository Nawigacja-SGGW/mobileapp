import '../../global.css';
import '../../translation';
import Drawer from 'expo-router/drawer';

import { DrawerMenu } from '~/components/menu';

export default function Layout() {
  return <Drawer drawerContent={() => <DrawerMenu />} />;

}
