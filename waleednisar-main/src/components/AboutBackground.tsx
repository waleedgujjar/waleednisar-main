import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

const AboutBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  // Memoized particle positions for performance
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    })), []
  );

  return (
    <motion.div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ opacity }}
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Primary Aurora - Top Left */}
      <motion.div
        className="absolute -top-[50%] -left-[30%] w-[160%] h-[100%]"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 30% 20%, hsl(var(--primary) / 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 30%, hsl(var(--secondary) / 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 70% 10%, hsl(280 80% 60% / 0.12) 0%, transparent 50%)
          `,
          y: y1,
        }}
        animate={{
          x: [0, 50, -30, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Aurora - Bottom Right */}
      <motion.div
        className="absolute -bottom-[40%] -right-[30%] w-[140%] h-[80%]"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 70% 80%, hsl(var(--secondary) / 0.22) 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 80% 70%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 90%, hsl(200 80% 60% / 0.1) 0%, transparent 50%)
          `,
          y: y2,
        }}
        animate={{
          x: [0, -60, 30, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Central Nebula Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.08) 0%, transparent 40%),
            radial-gradient(circle at 30% 40%, hsl(var(--secondary) / 0.06) 0%, transparent 35%),
            radial-gradient(circle at 70% 60%, hsl(280 80% 60% / 0.05) 0%, transparent 30%)
          `,
          y: y3,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 10, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Orb 1 - Primary */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.1) 35%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 80, -40, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Orb 2 - Secondary */}
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.35) 0%, hsl(var(--secondary) / 0.12) 35%, transparent 65%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.2, 1, 1.3, 1.2],
          x: [0, -80, 40, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Orb 3 - Accent */}
      <motion.div
        className="absolute top-[50%] right-[20%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(280 80% 60% / 0.25) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 0.9, 1],
          x: [0, -50, 30, 0],
          y: [0, 40, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Geometric Elements - Rotating Squares */}
      <motion.div
        className="absolute top-[12%] right-[15%] w-48 h-48"
        style={{ rotate }}
      >
        <motion.div 
          className="absolute inset-0 border-2 border-primary/20 rounded-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute inset-6 border border-secondary/15 rounded-2xl rotate-45"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute inset-12 border border-primary/10 rounded-xl"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Geometric Elements - Floating Circle */}
      <motion.div
        className="absolute bottom-[20%] left-[12%] w-36 h-36"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 border-2 border-secondary/20 rounded-full" />
        <motion.div 
          className="absolute inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-sm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="absolute inset-8 border border-primary/15 rounded-full" />
      </motion.div>

      {/* Glowing Stars/Points */}
      <motion.div
        className="absolute top-[35%] right-[8%] w-4 h-4 rounded-full bg-primary"
        style={{
          boxShadow: '0 0 80px 25px hsl(var(--primary) / 0.5), 0 0 120px 50px hsl(var(--primary) / 0.25)',
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[22%] w-3 h-3 rounded-full bg-secondary"
        style={{
          boxShadow: '0 0 60px 20px hsl(var(--secondary) / 0.6), 0 0 100px 40px hsl(var(--secondary) / 0.3)',
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute top-[60%] left-[40%] w-2 h-2 rounded-full bg-white"
        style={{
          boxShadow: '0 0 40px 10px hsl(0 0% 100% / 0.4), 0 0 60px 20px hsl(0 0% 100% / 0.2)',
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/50"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Horizon Lines */}
      <motion.div
        className="absolute top-[25%] left-0 w-full h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 30%, hsl(var(--secondary) / 0.3) 70%, transparent 100%)',
        }}
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scaleX: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[35%] left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--secondary) / 0.3) 40%, hsl(var(--primary) / 0.25) 60%, transparent 100%)',
        }}
        animate={{
          opacity: [0.05, 0.3, 0.05],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 opacity-50" />
      <div className="absolute inset-0 bg-radial-gradient opacity-30" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)',
      }} />
    </motion.div>
  );
};

export default AboutBackground;