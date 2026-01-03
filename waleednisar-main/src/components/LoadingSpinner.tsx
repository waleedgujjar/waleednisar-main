import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
};

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-primary/20 border-t-primary`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

// Dots loading animation
export const LoadingDots = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            y: [-2, 2, -2],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Skeleton loading placeholder
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className = '', variant = 'text' }: SkeletonProps) => {
  const baseClasses = 'bg-muted animate-pulse';
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Page loading overlay
interface PageLoadingProps {
  isLoading: boolean;
}

export const PageLoading = ({ isLoading }: PageLoadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm ${
        isLoading ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isLoading ? 1 : 0.8, 
          opacity: isLoading ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-2xl font-bold text-primary-foreground">JD</span>
        </motion.div>
        <LoadingDots />
      </motion.div>
    </motion.div>
  );
};

// Progress bar loading
interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className = '' }: ProgressBarProps) => {
  return (
    <div className={`h-1 bg-muted rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};

export default LoadingSpinner;
