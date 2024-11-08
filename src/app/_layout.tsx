import '../../global.css';
import '../../translation';
import Drawer from 'expo-router/drawer';
import { useState } from 'react';

import { TopPanel } from './TopPanel';
import { SlidingMenu } from './menu';

export default function Layout() {
  return <Drawer />;
}
