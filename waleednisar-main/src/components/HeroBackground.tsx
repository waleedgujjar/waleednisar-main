import { useRef, useMemo, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Optimized Aurora - reduced complexity
const CinematicAurora = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%]"
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    >
      <div 
        className="absolute inset-0 blur-3xl opacity-50"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--primary) / 0.3), transparent 30%, hsl(var(--accent) / 0.2), transparent 60%, hsl(var(--primary) / 0.25), transparent)',
        }}
      />
    </motion.div>
    
    <motion.div
      className="absolute -bottom-1/2 -right-1/4 w-[180%] h-[180%]"
      animate={{ rotate: -360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    >
      <div 
        className="absolute inset-0 blur-3xl opacity-40"
        style={{
          background: 'conic-gradient(from 180deg, hsl(var(--accent) / 0.25), transparent 40%, hsl(var(--primary) / 0.2), transparent)',
        }}
      />
    </motion.div>
  </div>
));

// Reduced orbs from 6 to 4
const FloatingOrbs = memo(() => {
  const orbs = useMemo(() => [
    { size: 400, x: '5%', y: '15%', color: 'primary', delay: 0, duration: 28 },
    { size: 500, x: '75%', y: '20%', color: 'accent', delay: 2, duration: 32 },
    { size: 300, x: '65%', y: '65%', color: 'primary', delay: 4, duration: 24 },
    { size: 450, x: '15%', y: '75%', color: 'accent', delay: 1, duration: 30 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color === 'primary' 
              ? 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

// Reduced particles from 80 to 40
const ParticleField = memo(() => {
  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `hsl(var(--primary) / 0.6)`,
          }}
          animate={{
            y: -150,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

// Static grid - removed animation
const AnimatedGrid = memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div 
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--primary) / 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--primary) / 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }}
    />
  </div>
));

// Reduced beams from 6 to 4
const LightBeams = memo(() => (
  <div className="absolute inset-0 overflow-hidden opacity-60">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute h-[200%] w-[2px] origin-top will-change-transform"
        style={{
          left: `${15 + i * 22}%`,
          top: '-50%',
          background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.3), transparent)`,
          transform: `rotate(${-15 + i * 10}deg)`,
        }}
        animate={{
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 5 + i,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
));

// CSS-based noise texture (no SVG)
const NoiseTexture = memo(() => (
  <div 
    className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.03) 2px, hsl(var(--foreground) / 0.03) 4px)`,
    }}
  />
));

// Optimized code snippets
const FloatingCode = memo(() => {
  const snippets = useMemo(() => [
    { code: '<Dev />', x: '5%', y: '15%', delay: 0 },
    { code: 'const ∞', x: '88%', y: '25%', delay: 2 },
    { code: 'npm run', x: '10%', y: '75%', delay: 4 },
    { code: '{...skills}', x: '90%', y: '50%', delay: 3 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-primary/30 backdrop-blur-sm px-3 py-1.5 rounded border border-primary/10 bg-background/5"
          style={{ left: snippet.x, top: snippet.y }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: [20, 0, -20],
          }}
          transition={{
            duration: 8,
            delay: snippet.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
});

// Simplified morphing blob
const MorphingBlob = memo(({ className, color = 'primary' }: { className?: string; color?: string }) => (
  <motion.div
    className={`absolute blur-3xl ${className}`}
    style={{
      background: color === 'primary' 
        ? 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)'
        : 'radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 70%)',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    }}
    animate={{
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
));

// Reduced rings from 3 to 2
const OrbitingRings = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
    {[400, 600].map((size, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/8"
        style={{ width: size, height: size }}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{
          duration: 50 + i * 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-primary/50"
          style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.5)' }}
        />
      </motion.div>
    ))}
  </div>
));

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Simplified transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const smoothY = useSpring(y, { stiffness: 50, damping: 30 });

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Aurora with parallax */}
      <motion.div style={{ y: smoothY }}>
        <CinematicAurora />
      </motion.div>
      
      {/* Floating orbs */}
      <FloatingOrbs />
      
      {/* Morphing blobs - reduced from 3 to 2 */}
      <MorphingBlob className="top-[10%] -left-[15%] w-[600px] h-[600px]" color="primary" />
      <MorphingBlob className="bottom-[5%] -right-[15%] w-[500px] h-[500px]" color="accent" />
      
      {/* Grid */}
      <AnimatedGrid />
      
      {/* Light beams */}
      <LightBeams />
      
      {/* Rings */}
      <OrbitingRings />
      
      {/* Particles */}
      <ParticleField />
      
      {/* Code */}
      <FloatingCode />
      
      {/* Noise */}
      <NoiseTexture />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)',
        }}
      />
    </motion.div>
  );
};

export default memo(HeroBackground);