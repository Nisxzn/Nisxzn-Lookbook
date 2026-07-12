'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    // Initial calculation and a slight delay for content to settle
    updateDimensions();
    const timeoutId = setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    
    const observer = new MutationObserver(updateDimensions);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  // Calculate proportional thumb height, with a minimum of 40px
  const thumbHeight = windowHeight && documentHeight 
    ? Math.max(40, (windowHeight / documentHeight) * windowHeight) 
    : 0;

  // Map scroll progress to thumb position
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, windowHeight - thumbHeight]
  );
  
  // Smooth the thumb movement for a premium feel
  const smoothY = useSpring(y, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  });

  // Hide the scrollbar if the content fits the screen (or before hydration finishes height calculation)
  if (!windowHeight || !documentHeight || documentHeight <= windowHeight) {
    return (
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { display: none !important; }
        * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide the native scrollbar */
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />
      <motion.div
        style={{
          y: smoothY,
          height: thumbHeight > 0 ? thumbHeight : '20%',
          position: 'fixed',
          top: 0,
          right: '2px',
          width: '5px',
          backgroundColor: '#fff',
          mixBlendMode: 'difference',
          borderRadius: '4px',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
