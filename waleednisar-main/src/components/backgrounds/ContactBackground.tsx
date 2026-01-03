import { motion } from 'framer-motion';

const ContactBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Dramatic Aurora Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%, hsl(var(--primary) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 70% 20%, hsl(var(--secondary) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 35% at 30% 30%, hsl(270 80% 60% / 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Aurora */}
      <motion.div
        className="absolute -bottom-[20%] left-0 w-full h-[50%]"
        style={{
          background: `
            radial-gradient(ellipse 90% 50% at 50% 100%, hsl(var(--secondary) / 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 80% 90%, hsl(var(--primary) / 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          x: [0, -30, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Large Gradient Orbs */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Central Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating @ Symbol */}
      <motion.div
        className="absolute top-[35%] left-[12%] text-9xl font-light text-primary/[0.06] select-none"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        @
      </motion.div>

      {/* Mail Envelope Shapes */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-20 h-14 border-2 border-primary/15 rounded-sm"
        style={{
          clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)',
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[25%] left-[6%] w-16 h-12 border-2 border-secondary/15 rounded-sm"
        style={{
          clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)',
        }}
        animate={{
          y: [0, 25, 0],
          rotate: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Pulse Rings */}
      <div className="absolute bottom-[30%] right-[25%]">
        <motion.div
          className="absolute w-40 h-40 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-40 h-40 rounded-full border-2 border-secondary/15"
          animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
        />
        <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: '0 0 30px 10px hsl(var(--primary) / 0.4)',
          }}
        />
      </div>

      {/* Particle Stream */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: '80%',
            background: i % 2 === 0 
              ? 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
            boxShadow: i % 2 === 0
              ? '0 0 15px 5px hsl(var(--primary) / 0.4)'
              : '0 0 15px 5px hsl(var(--secondary) / 0.4)',
          }}
          animate={{
            y: [0, -250],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Corner Dot Grids */}
      <div className="absolute top-8 right-8 grid grid-cols-5 gap-3 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-8 grid grid-cols-5 gap-3 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-secondary"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Gradient Edges */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export default ContactBackground;