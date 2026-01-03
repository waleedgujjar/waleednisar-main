import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const magneticRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  
  // Spring configs for smooth movement
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const trailSpringConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const magneticSpringConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    let x = e.clientX;
    let y = e.clientY;
    
    // Apply magnetic effect when near interactive elements
    if (magneticRef.current && isMagnetic) {
      const { x: elX, y: elY, width, height } = magneticRef.current;
      const centerX = elX + width / 2;
      const centerY = elY + height / 2;
      
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(width, height) * 0.8;
      
      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 0.4;
        x = x - deltaX * force;
        y = y - deltaY * force;
      }
    }
    
    cursorX.set(x);
    cursorY.set(y);
  }, [cursorX, cursorY, isMagnetic]);

  useEffect(() => {
    // Hide custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      setIsMagnetic(true);
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      magneticRef.current = {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsMagnetic(false);
      magneticRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Use MutationObserver to handle dynamically added elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-magnetic]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    let currentElements = addListeners();

    const observer = new MutationObserver(() => {
      // Clean up old listeners
      currentElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      // Add new listeners
      currentElements = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      currentElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseMove]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      />

      {/* Trailing ring cursor */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-primary/50 pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.9 : 0.4,
          borderWidth: isHovering ? '1px' : '2px',
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      />

      {/* Magnetic glow effect when hovering */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997]"
          style={{
            x: trailXSpring,
            y: trailYSpring,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }}
        />
      )}

      {/* Keep default cursor visible alongside custom cursor */}
    </>
  );
};

export default CustomCursor;
