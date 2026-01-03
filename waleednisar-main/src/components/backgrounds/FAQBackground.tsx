import { motion } from 'framer-motion';

const FAQBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Aurora Effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 90% 50% at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 25% 30%, hsl(var(--secondary) / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 35% at 75% 25%, hsl(270 80% 60% / 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Large Gradient Orbs */}
      <motion.div
        className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Central Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Question Marks - More Prominent */}
      <motion.div
        className="absolute top-[12%] right-[12%] text-[150px] font-bold text-primary/[0.06] select-none"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        ?
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[8%] text-[120px] font-bold text-secondary/[0.06] select-none"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -12, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        ?
      </motion.div>
      <motion.div
        className="absolute top-[45%] right-[5%] text-[80px] font-bold text-primary/[0.04] select-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        ?
      </motion.div>

      {/* Pulsing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/10"
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-secondary/10"
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/8"
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 3 }}
        />
      </div>

      {/* Constellation Points with Glows */}
      {[
        { x: '18%', y: '28%', delay: 0, color: 'primary' },
        { x: '32%', y: '22%', delay: 0.5, color: 'secondary' },
        { x: '28%', y: '42%', delay: 1, color: 'primary' },
        { x: '68%', y: '58%', delay: 1.5, color: 'secondary' },
        { x: '78%', y: '48%', delay: 2, color: 'primary' },
        { x: '72%', y: '32%', delay: 2.5, color: 'secondary' },
        { x: '12%', y: '68%', delay: 3, color: 'primary' },
        { x: '85%', y: '72%', delay: 3.5, color: 'secondary' },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ 
            left: dot.x, 
            top: dot.y,
            background: dot.color === 'primary' 
              ? 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
            boxShadow: dot.color === 'primary'
              ? '0 0 20px 8px hsl(var(--primary) / 0.3)'
              : '0 0 20px 8px hsl(var(--secondary) / 0.3)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="faqLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="faqLine2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="18%" y1="28%" x2="32%" y2="22%"
          stroke="url(#faqLine1)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
        />
        <motion.line
          x1="32%" y1="22%" x2="28%" y2="42%"
          stroke="url(#faqLine2)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
        />
        <motion.line
          x1="68%" y1="58%" x2="78%" y2="48%"
          stroke="url(#faqLine1)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
        />
      </svg>

      {/* Gradient Edges */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default FAQBackground;