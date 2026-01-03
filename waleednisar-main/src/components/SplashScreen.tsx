import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Subtle radial glow behind logo */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsla(217, 91%, 60%, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Logo Container with Circular Ring */}
        <motion.div
          className="relative z-10 mb-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 20,
            delay: 0.2,
          }}
        >
          <div className="relative">
            {/* Animated circular ring */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: 'hsl(var(--primary))',
                borderRightColor: 'hsl(var(--primary) / 0.5)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Logo box */}
            <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <motion.span
                className="text-4xl font-bold text-primary-foreground tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                WN
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-2xl md:text-3xl font-semibold mb-3 text-foreground"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Waleed Nisar
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-muted-foreground text-sm mb-10 code-font tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Full Stack Developer
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-48 h-0.5 bg-muted/50 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.span
          className="mt-4 text-xs text-muted-foreground code-font tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          {progress}%
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
