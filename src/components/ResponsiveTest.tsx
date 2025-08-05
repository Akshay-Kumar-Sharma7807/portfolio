/**
 * Component for testing responsive design and mobile optimization
 * This component can be temporarily added to verify responsive behavior
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ResponsiveTest = () => {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    devicePixelRatio: 1,
    isTouchDevice: false,
    orientation: 'portrait'
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      });
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    window.addEventListener('orientationchange', updateScreenInfo);

    return () => {
      window.removeEventListener('resize', updateScreenInfo);
      window.removeEventListener('orientationchange', updateScreenInfo);
    };
  }, []);

  const getBreakpoint = () => {
    if (screenInfo.width >= 1536) return '2xl';
    if (screenInfo.width >= 1280) return 'xl';
    if (screenInfo.width >= 1024) return 'lg';
    if (screenInfo.width >= 768) return 'md';
    if (screenInfo.width >= 640) return 'sm';
    return 'xs';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs"
    >
      <div className="space-y-1">
        <div className="font-bold text-orange-400">Screen Info</div>
        <div>Size: {screenInfo.width} × {screenInfo.height}</div>
        <div>Breakpoint: <span className="text-green-400">{getBreakpoint()}</span></div>
        <div>DPR: {screenInfo.devicePixelRatio}</div>
        <div>Touch: {screenInfo.isTouchDevice ? '✓' : '✗'}</div>
        <div>Orientation: {screenInfo.orientation}</div>
      </div>
      
      {/* Touch target test */}
      <div className="mt-3 pt-2 border-t border-gray-600">
        <div className="font-bold text-orange-400 mb-2">Touch Targets</div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs min-h-[44px] min-w-[44px] touch-manipulation">
            44px
          </button>
          <button className="bg-red-500 text-white px-2 py-1 rounded text-xs h-8 w-8">
            32px
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResponsiveTest;