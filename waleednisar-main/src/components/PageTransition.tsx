import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Section transition with parallax
interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  enableParallax?: boolean;
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const SectionTransition = ({ 
  children, 
  className = '', 
  delay = 0,
  enableParallax = false,
}: SectionTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 100, damping: 30 }
  );

  if (enableParallax) {
    return (
      <motion.div
        ref={sectionRef}
        style={{ y }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Fade in animation wrapper
interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: FadeInProps) => {
  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Blur fade animation
interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const BlurFade = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: BlurFadeProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: 'blur(12px)',
        y: 20,
      }}
      whileInView={{ 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0,
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ 
  children, 
  className = '', 
  staggerDelay = 0.08 
}: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale on hover wrapper
interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export const ScaleOnHover = ({ children, scale = 1.03, className = '' }: ScaleOnHoverProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Reveal on scroll with clip path
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
      }}
      whileInView={{ 
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
