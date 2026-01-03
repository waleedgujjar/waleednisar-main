import { motion } from 'framer-motion';

const SkillsBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated Aurora Waves */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%, hsl(var(--secondary) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 60% 30% at 80% 20%, hsl(270 80% 60% / 0.08) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Large Mesh Gradient Blob */}
      <motion.div
        className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(var(--secondary) / 0.15) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: `
            radial-gradient(circle at 60% 40%, hsl(var(--secondary) / 0.2) 0%, transparent 50%),
            radial-gradient(circle at 30% 60%, hsl(var(--primary) / 0.1) 0%, transparent 50%)
          `,
          filter: 'blur(70px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-[15%] left-[8%] text-6xl font-mono text-primary/10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {'</>'}
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[12%] text-5xl font-mono text-secondary/10"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        {'{ }'}
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[20%] text-4xl font-mono text-primary/8"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        {'()=>'}
      </motion.div>

      {/* Hexagon Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-skills" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" 
              transform="translate(-12.3, -22)" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-skills)" className="text-primary" />
      </svg>

      {/* Glowing Nodes with Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skillLine1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="skillLine2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="10%" y1="25%" x2="45%" y2="15%"
          stroke="url(#skillLine1)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.line
          x1="55%" y1="75%" x2="90%" y2="55%"
          stroke="url(#skillLine2)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
        />
      </svg>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-[25%] right-[25%] w-3 h-3 rounded-full bg-primary"
        style={{
          boxShadow: '0 0 40px 15px hsl(var(--primary) / 0.5), 0 0 80px 30px hsl(var(--primary) / 0.2)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[30%] w-2 h-2 rounded-full bg-secondary"
        style={{
          boxShadow: '0 0 30px 10px hsl(var(--secondary) / 0.5), 0 0 60px 20px hsl(var(--secondary) / 0.2)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Gradient Edges */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default SkillsBackground;