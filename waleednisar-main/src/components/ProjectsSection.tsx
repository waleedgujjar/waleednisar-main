import { useRef, useState, memo, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import Ecom from "@/assets/ecom.png";
import Cric from "@/assets/cric.png";
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const projects = [
{
  id: 1,
  title: 'E-COM Clothing Website',
  category: 'Full Stack',
  description:
    'A modern e-commerce solution with real-time inventory management, secure payments via Stripe, and an intuitive admin dashboard for managing products and orders.',
  shortDesc: 'Modern e-commerce with real-time inventory.',
  image: Ecom,
  tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  liveUrl: 'https://sassiaesthetics.com/',
  color: 'from-violet-500 to-purple-600',
  features: [
    'Real-time inventory',
    'Secure payments',
    'Admin dashboard',
    'Order tracking',
  ],
}
,
{
  id: 2,
  title: 'AI Quiz App With Next.js',
  category: 'AI/ML',
  description:
    'An AI-powered quiz application built with Next.js that generates personalized quizzes using Gemini AI. The platform adapts questions based on user input, tracks performance, and enhances learning through intelligent question generation.',
  shortDesc: 'AI-powered quiz generation & learning.',
  image: 'https://waleed-portfolio-chi.vercel.app/assets/p7-CTqocsYS.png',
  tags: ['Next.js', 'Gemini AI', 'TypeScript', 'React'],
  liveUrl: 'https://quizai-sigma.vercel.app/',
  color: 'from-blue-500 to-cyan-500',
  features: [
    'AI-generated quizzes',
    'Adaptive difficulty',
    'Real-time feedback',
    'Performance tracking',
  ],
}
,
 {
  id: 3,
  title: 'Fantasy Cric Gala Web App',
  category: 'Full Stack',
  description:
    'A full-stack fantasy cricket platform that allows users to create teams, participate in live matches, and track real-time scores and leaderboards. Built for scalability and performance with modern web technologies.',
  shortDesc: 'Fantasy cricket with live scores & leaderboards.',
  image: Cric,
  tags: ['TypeScript', 'Next.js', 'AWS', 'GraphQL'],
  liveUrl: 'https://www.cricgala.com/',
  githubUrl: '#',
  color: 'from-emerald-500 to-green-500',
  features: [
    'Team creation & management',
    'Live match updates',
    'Real-time leaderboards',
    'Secure authentication',
  ],
}
,
 {
  id: 4,
  title: 'Loosid – Sober Dating App',
  category: 'Full Stack',
  description:
    'A purpose-driven sober dating and social platform designed to help individuals connect in a supportive, alcohol-free environment. The app focuses on meaningful connections through real-time messaging, profile matching, and community-first features.',
  shortDesc: 'Sober dating with real-time chat.',
  image: 'https://www.rhsmith.umd.edu/sites/default/files/social-media/2022/12/online-dating-game.jpg',
  tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
  liveUrl: 'https://loosiddating.com/',
  color: 'from-pink-500 to-rose-500',
  features: [
    'Real-time chat & messaging',
    'User profiles & matching',
    'Push notifications',
    'Secure authentication',
  ],
}
,
{
  id: 5,
  title: 'News Website',
  category: 'Full Stack',
  description:
    'A modern news platform built with Next.js that delivers real-time articles across multiple categories. The application focuses on fast performance, SEO optimization, and a clean reading experience for users.',
  shortDesc: 'Fast, SEO-friendly news platform.',
  image: 'https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg',
  tags: ['Next.js', 'Prisma', 'tRPC'],
  liveUrl: 'https://jewasity.com/',
  githubUrl: '#',
  color: 'from-orange-500 to-amber-500',
  features: [
    'Category-based news articles',
    'SEO-optimized pages',
    'Fast page rendering',
    'Responsive design',
  ],
}
,
{
  id: 6,
  title: 'Co Carting – Cross Platform App',
  category: 'Mobile',
  description:
    'A cross-platform shopping companion app that allows users to create, share, and manage carts collaboratively across multiple devices. Designed to simplify group shopping experiences with real-time cart synchronization.',
  shortDesc: 'Collaborative cross-platform shopping.',
  image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
  tags: ['React Native', 'Express', 'MongoDB'],
  liveUrl: 'https://play.google.com/store/apps/details?id=com.cocarting&pli=1',
  color: 'from-teal-500 to-cyan-500',
  features: [
    'Shared shopping carts',
    'Real-time cart sync',
    'Cross-platform support',
    'Secure user accounts',
  ],
}
,
 {
  id: 7,
  title: 'Rafiq – Quran, Athan & Prayer App',
  category: 'Web / Mobile',
  description:
    'A faith-based web and mobile application providing access to the Holy Quran, accurate prayer times, and Athan notifications. The platform is designed to support daily spiritual practices with a clean, accessible, and user-friendly experience.',
  shortDesc: 'Quran, Athan & prayer times.',
  image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=600&fit=crop',
  tags: ['React Native', 'Node.js', 'APIs'],
  liveUrl: 'https://rafiq.kuduconsulting.com/',
  color: 'from-red-500 to-orange-500',
  features: [
    'Prayer times & Athan alerts',
    'Quran reading experience',
    'Location-based timings',
    'Responsive web & mobile support',
  ],
}
,
 {
  id: 8,
  title: 'Bokuza – Digital Marketing for Creators',
  category: 'EdTech',
  description:
    'An EdTech platform designed to help content creators learn and apply digital marketing skills through structured courses, practical lessons, and performance-focused learning paths.',
  shortDesc: 'Digital marketing education for creators.',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  liveUrl: 'https://bokuza.com/',
  color: 'from-indigo-500 to-purple-500',
  features: [
    'Creator-focused marketing courses',
    'Structured learning paths',
    'Progress tracking',
    'Interactive learning experience',
  ],
}

];

const categories = ['All', 'Full Stack', 'AI/ML', 'Mobile', 'EdTech'];

const ProjectCard = memo(({ project, index, onSelect }: any) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 mix-blend-overlay`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md text-xs font-semibold border border-border/50">
            {project.category}
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => onSelect(project)}
              className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary"
            >
              <Sparkles className="w-4 h-4" />
              View Details
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {project.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium border border-border/50"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium border border-border/50">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-full gap-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank');
              }}
            >
              <ExternalLink className="w-3 h-3" />
              Live Demo
            </Button>
          </div>
        </div>
        <div className={`h-1 bg-gradient-to-r ${project.color}`} />
      </div>
    </motion.div>
  );
});

const ProjectsBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <motion.div
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
      style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
      style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)' }}
      animate={{
        x: [0, -80, 0],
        y: [0, 60, 0],
        scale: [1.2, 1, 1.2],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Floating particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/40"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          delay: Math.random() * 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}

    {/* Grid pattern */}
    <div 
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }}
    />

    {/* Floating geometric shapes */}
    <motion.div
      className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-primary/20 rounded-2xl"
      animate={{
        rotate: 360,
        x: [0, 50, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />

    <motion.div
      className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-secondary/20 rounded-full"
      animate={{
        rotate: -360,
        x: [0, -40, 0],
        y: [0, 40, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />

    {/* Light beams */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute h-[150%] w-[2px] origin-top"
        style={{
          left: `${20 + i * 30}%`,
          top: '-25%',
          background: `linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.2), transparent)`,
          transform: `rotate(${-10 + i * 10}deg)`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 4 + i,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
  </div>
));

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects = useMemo(() => 
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated 3D Background */}
      <ProjectsBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-primary font-mono text-sm tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {'<'} FEATURED WORK {'/>'} 
          </motion.span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">My </span>
            <span className="gradient-text text-glow">Projects</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Explore my latest work across different technologies and domains
          </p>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-border/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border/30"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50 rounded-3xl">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-background/90 backdrop-blur-md text-sm font-semibold border border-border/50">
                  {selectedProject.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedProject.color}`} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 rounded-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full gap-2 border-border hover:border-primary/50"
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default memo(ProjectsSection);