import { motion } from 'framer-motion';

const TestimonialsBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Magical Aurora Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 0%, hsl(270 80% 60% / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 20% 40%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 35% at 80% 30%, hsl(var(--secondary) / 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Flowing Gradient Waves */}
      <motion.div
        className="absolute -top-[20%] -left-[20%] w-[700px] h-[700px] rounded-full"
        style={{
          background: `
            radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -bottom-[20%] -right-[20%] w-[600px] h-[600px] rounded-full"
        style={{
          background: `
            radial-gradient(circle, hsl(var(--secondary) / 0.18) 0%, transparent 60%)
          `,
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Center Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Quote Mark Decorations - Larger and More Prominent */}
      <motion.div
        className="absolute top-[8%] left-[3%] text-[250px] font-serif text-primary/[0.04] select-none leading-none"
        animate={{
          y: [0, -20, 0],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        "
      </motion.div>
      <motion.div
        className="absolute bottom-[8%] right-[3%] text-[250px] font-serif text-secondary/[0.04] select-none leading-none rotate-180"
        animate={{
          y: [0, 20, 0],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        "
      </motion.div>

      {/* Floating Card Silhouettes */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-28 h-20 border border-primary/10 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 5, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary/10" />
        <div className="absolute bottom-4 left-3 right-6 h-1.5 bg-primary/10 rounded-full" />
        <div className="absolute bottom-7 left-3 right-10 h-1 bg-primary/5 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[10%] w-24 h-16 border border-secondary/10 rounded-2xl bg-gradient-to-br from-secondary/[0.03] to-transparent"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -6, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-secondary/10" />
        <div className="absolute bottom-3 left-2 right-5 h-1 bg-secondary/10 rounded-full" />
      </motion.div>

      {/* Orbiting Ring */}
      <motion.div
        className="absolute top-[35%] right-[20%] w-48 h-48 rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div 
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"
          style={{
            boxShadow: '0 0 20px 8px hsl(var(--primary) / 0.4)',
          }}
        />
      </motion.div>

      {/* Star-like Glowing Points */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: '3px',
            height: '3px',
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
            boxShadow: i % 2 === 0 
              ? '0 0 15px 5px hsl(var(--primary) / 0.4)'
              : '0 0 15px 5px hsl(var(--secondary) / 0.4)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating Stars */}
      <motion.div
        className="absolute top-[55%] right-[8%] flex gap-2"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-3 h-3 bg-yellow-500/40 rotate-45"
            style={{
              boxShadow: '0 0 10px 3px rgba(234, 179, 8, 0.3)',
            }}
          />
        ))}
      </motion.div>

      {/* Gradient Edges */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default TestimonialsBackground;