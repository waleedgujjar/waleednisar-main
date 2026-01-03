import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProjectsBackground from './backgrounds/ProjectsBackground';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'A modern e-commerce solution with real-time inventory management, secure payments via Stripe, and an intuitive admin dashboard for managing products and orders.',
    shortDesc: 'Modern e-commerce with real-time inventory.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-violet-500 to-purple-600',
    accentColor: 'violet',
    features: ['Real-time inventory', 'Secure payments', 'Admin dashboard', 'Order tracking'],
  },
  {
    id: 2,
    title: 'AI Content Generator',
    category: 'AI/ML',
    description: 'An intelligent content creation tool powered by GPT-4, helping marketers generate engaging copy, blog posts, and social media content in seconds.',
    shortDesc: 'GPT-4 powered content creation.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'blue',
    features: ['GPT-4 integration', 'Multiple templates', 'Export options', 'Team collaboration'],
  },
  {
    id: 3,
    title: 'Financial Dashboard',
    category: 'Full Stack',
    description: 'Real-time financial analytics dashboard with interactive charts, portfolio tracking, and AI-powered investment insights for informed decisions.',
    shortDesc: 'Real-time analytics with interactive charts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['TypeScript', 'D3.js', 'AWS', 'GraphQL'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-emerald-500 to-green-500',
    accentColor: 'emerald',
    features: ['Live data sync', 'Custom charts', 'Portfolio alerts', 'Export reports'],
  },
  {
    id: 4,
    title: 'Social Media App',
    category: 'Mobile',
    description: 'A feature-rich social platform with real-time messaging, stories feature, and advanced content recommendation engine powered by machine learning.',
    shortDesc: 'Real-time messaging and stories.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tags: ['React Native', 'Firebase', 'Redux'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-pink-500 to-rose-500',
    accentColor: 'pink',
    features: ['Real-time chat', 'Stories', 'Push notifications', 'Content feed'],
  },
  {
    id: 5,
    title: 'Task Management',
    category: 'Full Stack',
    description: 'Collaborative project management with Kanban boards, team workflows, time tracking, and seamless integrations with popular tools.',
    shortDesc: 'Kanban boards and team workflows.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Prisma', 'tRPC'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-orange-500 to-amber-500',
    accentColor: 'orange',
    features: ['Kanban boards', 'Time tracking', 'Team chat', 'File sharing'],
  },
  {
    id: 6,
    title: 'Healthcare Portal',
    category: 'Full Stack',
    description: 'Patient management system with appointment scheduling, medical records, telemedicine support, and secure communication channels.',
    shortDesc: 'Patient management and scheduling.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-teal-500 to-cyan-500',
    accentColor: 'teal',
    features: ['Appointment booking', 'Medical records', 'Video calls', 'Prescriptions'],
  },
];

const categories = ['All', 'Full Stack', 'AI/ML', 'Mobile', 'Fintech', 'EdTech'];

interface Project3DCardProps {
  project: typeof projects[0];
  index: number;
  activeIndex: number;
  totalCards: number;
  onSelect: () => void;
}

const Project3DCard = ({ project, index, activeIndex, totalCards, onSelect }: Project3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Calculate position based on active index
  const offset = index - activeIndex;
  const isActive = offset === 0;
  const isVisible = Math.abs(offset) <= 2;

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cardRef}
      className="absolute left-1/2 top-0 w-[320px] md:w-[450px] lg:w-[550px] cursor-pointer"
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      initial={false}
      animate={{
        x: `calc(-50% + ${offset * 120}px)`,
        z: isActive ? 100 : -Math.abs(offset) * 150,
        scale: isActive ? 1 : 0.85 - Math.abs(offset) * 0.1,
        opacity: isActive ? 1 : 0.4 - Math.abs(offset) * 0.15,
        rotateY: offset * 25,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
      }}
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseLeave={isActive ? handleMouseLeave : undefined}
      onClick={isActive ? onSelect : undefined}
    >
      {/* Card Container */}
      <div className="relative group">
        {/* Glowing Background */}
        <motion.div
          className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br ${project.color} blur-2xl`}
          animate={{
            opacity: isActive ? [0.3, 0.5, 0.3] : 0.1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main Card */}
        <motion.div
          className="relative bg-card/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/50 shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={isActive ? { scale: 1.02 } : {}}
        >
          {/* Image Section */}
          <div className="relative h-[200px] md:h-[280px] lg:h-[320px] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              animate={isActive ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Overlay gradients */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 mix-blend-overlay`} />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            
            {/* 3D Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 font-bold text-2xl gradient-text"
              style={{ transform: 'translateZ(60px)' }}
              animate={isActive ? {
                y: [0, -5, 0],
                rotateZ: [-2, 2, -2],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>

            <motion.div
              className="absolute top-4 left-4 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-sm font-semibold text-foreground"
              style={{ transform: 'translateZ(40px)' }}
            >
              {project.category}
            </motion.div>

            {/* View Project Overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-8 py-4 rounded-full bg-background/95 backdrop-blur-md border border-primary/30 flex items-center gap-3 shadow-2xl"
                initial={{ scale: 0.8, y: 20 }}
                whileHover={{ scale: 1, y: 0 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">View Project</span>
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8" style={{ transform: 'translateZ(30px)' }}>
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-foreground mb-3"
              style={{ transform: 'translateZ(20px)' }}
            >
              {project.title}
            </motion.h3>

            <p className="text-muted-foreground text-sm md:text-base mb-5 line-clamp-2">
              {project.shortDesc}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium border border-border/50"
                  style={{ transform: `translateZ(${10 + i * 5}px)` }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'hsl(var(--primary) / 0.2)',
                    color: 'hsl(var(--primary))',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}
            animate={isActive ? {
              scaleX: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  }, [filteredProjects.length]);

  // Auto-rotate every 4 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [filteredProjects.length, isPaused]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-40 overflow-hidden min-h-screen"
    >
      {/* Background */}
      <ProjectsBackground />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block text-primary font-mono text-sm tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {'<'} FEATURED WORK {'/>'} 
          </motion.span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            <span className="text-foreground">My </span>
            <span className="gradient-text text-glow">Projects</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Explore my latest work with immersive 3D interactions
          </p>

          {/* Category Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category, i) => (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(0);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-border/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[500px] md:h-[600px] lg:h-[650px] perspective-1000"
          style={{ perspective: '1500px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards */}
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {filteredProjects.map((project, index) => (
              <Project3DCard
                key={project.id}
                project={project}
                index={index}
                activeIndex={activeIndex}
                totalCards={filteredProjects.length}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <motion.button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 h-3 bg-gradient-to-r from-primary to-secondary'
                      : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Current Project Info */}
        <motion.div
          className="text-center mt-20"
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
            {filteredProjects[activeIndex]?.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              className="rounded-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-8"
              onClick={() => setSelectedProject(filteredProjects[activeIndex])}
            >
              <ArrowUpRight className="w-4 h-4" />
              View Details
            </Button>
            <Button
              variant="outline"
              className="rounded-full gap-2 border-border hover:border-primary/50 px-8"
            >
              <Github className="w-4 h-4" />
              Source Code
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold gradient-text mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border/50 rounded-3xl">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header Image */}
              <div className="relative h-[250px] md:h-[350px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${selectedProject.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                <div className="absolute top-6 left-6 px-5 py-2 rounded-full bg-background/80 backdrop-blur-md text-sm font-semibold text-foreground border border-border/50">
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

                {/* Features Grid */}
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
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full gap-2 border-border hover:border-primary/50"
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

export default ProjectsSection;
