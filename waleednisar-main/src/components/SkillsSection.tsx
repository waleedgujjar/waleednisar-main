import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Cloud, Palette, Settings } from 'lucide-react';
import SkillsBackground from './backgrounds/SkillsBackground';
import { TextReveal } from './TextReveal';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Vue.js', level: 75 },
      { name: 'TailwindCSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'from-purple-500 to-pink-400',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Express.js', level: 90 },
      { name: 'Python', level: 78 },
      { name: 'GraphQL', level: 82 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Prisma', level: 82 },
    ],
  },
  {
    title: 'DevOps',
    icon: Cloud,
    color: 'from-orange-500 to-amber-400',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 78 },
    ],
  },
  {
    title: 'UI/UX',
    icon: Palette,
    color: 'from-rose-500 to-red-400',
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 78 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Animation', level: 82 },
      { name: 'Accessibility', level: 80 },
    ],
  },
  {
    title: 'Tools',
    icon: Settings,
    color: 'from-indigo-500 to-violet-400',
    skills: [
      { name: 'VS Code', level: 98 },
      { name: 'Postman', level: 90 },
      { name: 'Jira', level: 85 },
      { name: 'Webpack', level: 75 },
      { name: 'Testing', level: 80 },
    ],
  },
];

const SkillBar = ({ skill, index, isInView }: { skill: { name: string; level: number }; index: number; isInView: boolean }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.1 * index, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ category, index, isInView }: { 
  category: typeof skillCategories[0]; 
  index: number; 
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
      </div>

      {/* Skills */}
      <div>
        {category.skills.map((skill, skillIndex) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            index={skillIndex} 
            isInView={isInView} 
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Skills Background */}
      <SkillsBackground />

      <div className="container-custom px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-card text-xs text-primary mb-4 tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text text-glow">Tech Stack</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Tech Icons Carousel */}
        <motion.div
          className="mt-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex gap-12 animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-12 shrink-0">
                {['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Next.js', 'TailwindCSS'].map((tech) => (
                  <div
                    key={`${setIndex}-${tech}`}
                    className="px-6 py-3 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS for infinite scroll */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
