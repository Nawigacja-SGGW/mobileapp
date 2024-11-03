import '../../global.css';
import '../../translation';
import { useState } from 'react';
import { SlidingMenu } from './menu';
import { TopPanel } from './TopPanel';

export default function Layout() {
  const [showSettings, setShowSettings] = useState(false);

  const handleMenuToggle = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <TopPanel 
        showSettings={showSettings}
        onMenuToggle={handleMenuToggle}
      />

      <SlidingMenu 
        visible={showSettings} 
        onClose={() => {
          console.log("Closing menu");
          setShowSettings(false);
        }}
      />
    </>
  );
}