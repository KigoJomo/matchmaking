"use client"

import { useEffect, useRef } from 'react';
import Lottie from "lottie-web";

export default function MyComponent() {
  const animationContainer = useRef(null);
  const animationInstance = useRef(null); // Use a ref to store the animation instance

  useEffect(() => {
    // Create the animation instance
    animationInstance.current = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/lotties/blob.json'
    });

    // Cleanup function to destroy the animation on unmount
    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy(); // Properly destroy the animation instance
      }
    };
  }, []);

  return (
    <div className="flex flex-col items justify-center blob" ref={animationContainer}></div>
  );
}
