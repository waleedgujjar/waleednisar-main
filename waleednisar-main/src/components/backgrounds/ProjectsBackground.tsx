import { motion } from 'framer-motion';

const ProjectsBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Cinematic Aurora Effect */}
      <motion.div
        className="absolute -top-[50%] left-0 w-full h-[100%]"
        style={{
          background: `
            radial-gradient(ellipse 120% 60% at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 30% 20%, hsl(270 80% 60% / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 35% at 70% 15%, hsl(var(--secondary) / 0.12) 0%, transparent 50%)
          `,
        }}
        animate={{
          x: [0, 50, -30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Glow */}
      <motion.div
        className="absolute -bottom-[30%] left-0 w-full h-[60%]"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 100%, hsl(var(--secondary) / 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 30% at 20% 80%, hsl(var(--primary) / 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          x: [0, -40, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-[15%] right-[5%] w-[450px] h-[450px] rounded-full"
        style={{
          background: `
            radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)
          `,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
        style={{
          background: `
            radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, hsl(var(--secondary) / 0.06) 40%, transparent 70%)
          `,
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-[20%] w-[3px] h-[200%] rotate-[20deg] origin-top"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--primary) / 0.2) 30%, hsl(var(--primary) / 0.2) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-1/2 right-[30%] w-[2px] h-[200%] rotate-[-15deg] origin-top"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--secondary) / 0.15) 30%, hsl(var(--secondary) / 0.15) 70%, transparent 100%)',
          }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      {/* Floating Frame Elements */}
      <motion.div
        className="absolute top-[25%] left-[5%] w-20 h-16 border-2 border-primary/15 rounded-xl"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-2 left-2 right-2 h-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full" />
        <div className="absolute bottom-3 left-2 right-6 h-1 bg-muted/30 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[8%] w-24 h-18 border-2 border-secondary/15 rounded-xl"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -6, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <div className="absolute top-2 left-2 right-2 h-2 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full" />
      </motion.div>

      {/* Glowing Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
            boxShadow: i % 2 === 0
              ? '0 0 20px 8px hsl(var(--primary) / 0.3)'
              : '0 0 20px 8px hsl(var(--secondary) / 0.3)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient Edges */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export default ProjectsBackground;