import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Cinematic Aurora Effect with multiple layers
const CinematicAurora = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Primary rotating aurora */}
    <motion.div
      className="absolute -top-1/2 -left-1/4 w-[200%] h-[200%]"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 120, repeat: Infinity, ease: "linear" },
        scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div 
        className="absolute inset-0 blur-3xl opacity-60"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--primary) / 0.3), transparent 30%, hsl(var(--accent) / 0.2), transparent 60%, hsl(var(--primary) / 0.25), transparent)',
        }}
      />
    </motion.div>
    
    {/* Secondary counter-rotating layer */}
    <motion.div
      className="absolute -bottom-1/2 -right-1/4 w-[180%] h-[180%]"
      animate={{
        rotate: [360, 0],
        scale: [1.1, 1, 1.1],
      }}
      transition={{
        rotate: { duration: 100, repeat: Infinity, ease: "linear" },
        scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div 
        className="absolute inset-0 blur-3xl opacity-50"
        style={{
          background: 'conic-gradient(from 180deg, hsl(var(--accent) / 0.25), transparent 40%, hsl(var(--primary) / 0.2), transparent)',
        }}
      />
    </motion.div>
    
    {/* Pulsing center glow */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%]"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [0.8, 1.3, 0.8],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div 
        className="w-full h-full blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.25) 0%, hsl(var(--primary) / 0.05) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  </div>
);

// Floating Orbs with depth and glow
const FloatingOrbs = () => {
  const orbs = useMemo(() => [
    { size: 400, x: '5%', y: '15%', color: 'primary', delay: 0, duration: 28 },
    { size: 500, x: '75%', y: '20%', color: 'accent', delay: 2, duration: 32 },
    { size: 300, x: '65%', y: '65%', color: 'primary', delay: 4, duration: 24 },
    { size: 450, x: '15%', y: '75%', color: 'accent', delay: 1, duration: 30 },
    { size: 350, x: '45%', y: '5%', color: 'primary', delay: 3, duration: 26 },
    { size: 280, x: '85%', y: '55%', color: 'accent', delay: 5, duration: 22 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color === 'primary' 
              ? 'radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, hsl(var(--accent) / 0.08) 40%, transparent 70%)',
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.25, 0.85, 1],
            opacity: [0.5, 0.9, 0.4, 0.5],
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
};

// Rising Particles
const ParticleField = () => {
  const particles = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 15,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.3) 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary) / 0.4)`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated Grid with pulse
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div 
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--primary) / 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--primary) / 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }}
    />
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--accent) / 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--accent) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '160px 160px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 60%)',
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Dynamic Light Beams
const LightBeams = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-[250%] w-[3px] origin-top"
        style={{
          left: `${10 + i * 18}%`,
          top: '-50%',
          background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.4), hsl(var(--primary) / 0.1), transparent)`,
          transform: `rotate(${-20 + i * 8}deg)`,
        }}
        animate={{
          opacity: [0, 0.7, 0],
          scaleY: [0.4, 1.2, 0.4],
        }}
        transition={{
          duration: 6 + i * 0.8,
          delay: i * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Noise Texture
const NoiseTexture = () => (
  <div 
    className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// Floating Code Snippets with glass effect
const FloatingCode = () => {
  const snippets = useMemo(() => [
    { code: '<Developer />', x: '3%', y: '12%', delay: 0 },
    { code: 'const passion = "∞"', x: '88%', y: '22%', delay: 2 },
    { code: 'npm run create', x: '8%', y: '78%', delay: 4 },
    { code: 'export default Hero', x: '82%', y: '82%', delay: 1 },
    { code: '{ ...skills }', x: '92%', y: '45%', delay: 3 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-primary/40 backdrop-blur-md px-4 py-2 rounded-lg border border-primary/10 bg-background/5"
          style={{ left: snippet.x, top: snippet.y }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            y: [30, 0, -30],
          }}
          transition={{
            duration: 10,
            delay: snippet.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
};

// Morphing Blob
const MorphingBlob = ({ className, color = 'primary' }: { className?: string; color?: string }) => (
  <motion.div
    className={`absolute blur-3xl ${className}`}
    style={{
      background: color === 'primary' 
        ? 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)'
        : 'radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)',
    }}
    animate={{
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Orbiting Rings
const OrbitingRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[300, 450, 600].map((size, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/10"
        style={{ width: size, height: size }}
        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
        transition={{
          duration: 40 + i * 15,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-primary/60"
          style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.6)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ))}
  </div>
);

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  
  const smoothY = useSpring(y, { stiffness: 40, damping: 25 });
  const smoothScale = useSpring(scale, { stiffness: 40, damping: 25 });

  return (
    <motion.div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Cinematic aurora with parallax */}
      <motion.div style={{ y: smoothY, scale: smoothScale }}>
        <CinematicAurora />
      </motion.div>
      
      {/* Floating orbs layer */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}>
        <FloatingOrbs />
      </motion.div>
      
      {/* Morphing blobs */}
      <MorphingBlob className="top-[10%] -left-[15%] w-[700px] h-[700px]" color="primary" />
      <MorphingBlob className="bottom-[5%] -right-[15%] w-[600px] h-[600px]" color="accent" />
      <MorphingBlob className="top-[40%] right-[20%] w-[400px] h-[400px]" color="primary" />
      
      {/* Animated grid */}
      <AnimatedGrid />
      
      {/* Light beams */}
      <LightBeams />
      
      {/* Orbiting rings */}
      <OrbitingRings />
      
      {/* Particle field */}
      <ParticleField />
      
      {/* Floating code */}
      <FloatingCode />
      
      {/* Noise texture */}
      <NoiseTexture />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
      
      {/* Radial vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)',
        }}
      />
    </motion.div>
  );
};

export default HeroBackground;
