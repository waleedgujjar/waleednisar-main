import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  type?: 'word' | 'letter' | 'line';
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const letterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(10px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const lineVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 40,
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const TextReveal = ({
  children,
  className = '',
  type = 'word',
  delay = 0,
  staggerDelay,
  once = true,
  as = 'div',
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  
  const Component = motion[as] as typeof motion.div;

  if (type === 'line') {
    return (
      <Component
        ref={ref}
        className={className}
        variants={lineVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </Component>
    );
  }

  if (type === 'letter') {
    const letters = children.split('');
    const actualStaggerDelay = staggerDelay ?? 0.03;
    
    return (
      <Component ref={ref} className={`${className} overflow-hidden`} style={{ perspective: '1000px' }}>
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            custom={i + delay / actualStaggerDelay}
            variants={letterVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="inline-block"
            style={{ 
              transformStyle: 'preserve-3d',
              whiteSpace: letter === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Word animation (default)
  const words = children.split(' ');
  const actualStaggerDelay = staggerDelay ?? 0.08;
  
  return (
    <Component ref={ref} className={`${className} overflow-hidden`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i + delay / actualStaggerDelay}
          variants={wordVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

// Staggered children reveal
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const StaggerReveal = ({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Gradient text reveal
interface GradientTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const GradientTextReveal = ({
  children,
  className = '',
  delay = 0,
  once = true,
}: GradientTextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
        initial={{ x: '-100%' }}
        animate={isInView ? { x: '100%' } : { x: '-100%' }}
        transition={{ 
          duration: 1.2, 
          delay: delay + 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ mixBlendMode: 'overlay' }}
      />
    </motion.div>
  );
};

export default TextReveal;
