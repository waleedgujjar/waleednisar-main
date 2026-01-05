import { useEffect, useRef, useState, memo, useMemo } from "react";
import aboutImg from "@/assets/about.png";
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Sparkles,
  Code2,
  Rocket,
  ArrowRight,
  Zap,
  Target,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  { year: "2024", title: "Full Stack Developer", company: "OFBS", type: "work" },
  { year: "2022", title: "Full Stack Developer", company: "Freelance", type: "work" },
  { year: "2020", title: "Junior Developer", company: "StartUp Hub", type: "work" },
  { year: "2024", title: "BS Computer Science", company: "Government College University Faisalabad", type: "education" },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed", icon: Target, color: "primary" },
  { value: 30, suffix: "+", label: "Happy Clients", icon: Users, color: "secondary" },
  { value: 99, suffix: "%", label: "Satisfaction Rate", icon: Award, color: "primary" },
];

const skills = [
  { name: "Frontend Dev", desc: "React, Next.js, Vue", gradient: "from-blue-500/10 to-cyan-500/10" },
  { name: "Backend Dev", desc: "Node.js, Python, Go", gradient: "from-purple-500/10 to-pink-500/10" },
  { name: "Database", desc: "PostgreSQL, MongoDB", gradient: "from-green-500/10 to-emerald-500/10" },
  { name: "Cloud & DevOps", desc: "AWS, Docker, CI/CD", gradient: "from-orange-500/10 to-red-500/10" },
];

// Optimized animated counter
const AnimatedNumber = memo(({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, count, value, rounded]);

  return (
    <span ref={ref} className="tabular-nums font-bold">
      {displayValue}
      {suffix}
    </span>
  );
});

const ProfileImage = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-full h-full">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 animate-pulse rounded-3xl" />
      )}

      {/* Main image */}
     <motion.img
  src={aboutImg}
  alt="Waleed Nisar – Full Stack Developer"
  loading="lazy"
  decoding="async"
  onLoad={() => setImageLoaded(true)}
  className="w-full h-full object-cover rounded-3xl"
  initial={{ opacity: 0, scale: 1.03 }}
  animate={isInView && imageLoaded ? { opacity: 1, scale: 1 } : undefined}
  transition={{ duration: 0.5, ease: "easeOut" }}
  style={{ objectPosition: "center 20%" }}
/>
      {/* Simplified overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent rounded-3xl" />
    </div>
  );
});

// Memoized stat card
const StatCard = memo(({ stat, index, isInView }: any) => (
  <motion.div
    className="col-span-4 relative group cursor-pointer"
    initial={{ opacity: 0, y: 40 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <div className="relative p-6 lg:p-7 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 h-full">
      <stat.icon className={`w-8 h-8 mb-4 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`} />
      
      <h4 className="text-4xl lg:text-5xl gradient-text mb-2">
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </h4>
      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
    </div>
  </motion.div>
));

// Memoized experience item
const ExperienceItem = memo(({ exp, index, isInView, isLast }: any) => (
  <motion.div
    className="flex items-start gap-5 group/item py-4 relative"
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
    whileHover={{ x: 5 }}
  >
    <div className="relative flex flex-col items-center">
      <div
        className={`w-3.5 h-3.5 rounded-full ${exp.type === "work" ? "bg-primary" : "bg-secondary"} ring-4 ring-background`}
      />
      {!isLast && (
        <div className="w-0.5 h-16 bg-gradient-to-b from-border to-transparent absolute top-5" />
      )}
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between gap-3 mb-1">
        <h4 className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
          {exp.title}
        </h4>
        <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full shrink-0 border border-border/50">
          {exp.year}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{exp.company}</p>
    </div>
  </motion.div>
));

// Memoized skill card
const SkillCard = memo(({ skill, index, isInView }: any) => (
  <motion.div
    className={`relative p-5 rounded-xl bg-gradient-to-br ${skill.gradient} border border-border/40 hover:border-primary/40 transition-all duration-300 group/skill`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
    whileHover={{ scale: 1.03, y: -3 }}
  >
    <h4 className="font-semibold text-foreground group-hover/skill:text-primary transition-colors">
      {skill.name}
    </h4>
    <p className="text-xs text-muted-foreground mt-1.5">{skill.desc}</p>
  </motion.div>
));

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const scrollToSection = useMemo(() => ({
    contact: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    projects: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
  }), []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden min-h-screen">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="w-16 h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ originX: 0 }}
          />
          <span className="text-sm font-semibold text-primary tracking-[0.3em] uppercase">About Me</span>
          <ArrowRight className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-5 lg:gap-6">
          {/* Hero Intro Card */}
          <motion.div 
            className="col-span-12 lg:col-span-8 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative p-8 lg:p-12 rounded-[2rem] bg-card/50 border border-border/50 backdrop-blur-xl overflow-hidden">
              {/* Simplified gradient orb */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="block text-foreground">I craft</span>
                  <span className="block gradient-text text-glow">digital experiences</span>
                  <span className="block text-foreground/90">that inspire & perform</span>
                </motion.h2>

                <motion.p
                  className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  With <span className="text-foreground font-semibold">3+ years</span> of experience, I specialize in
                  building modern web applications using React, Node.js, and cloud technologies. I believe in{" "}
                  <span className="text-primary">clean code</span>, thoughtful design, and creating products that make a
                  real difference.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2 px-8 shadow-lg shadow-primary/25"
                    onClick={scrollToSection.contact}
                  >
                    <Rocket className="w-5 h-5" />
                    Let's Collaborate
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/60 hover:border-primary/50 hover:bg-primary/5 gap-2 px-8"
                    onClick={scrollToSection.projects}
                  >
                    <Code2 className="w-5 h-5" />
                    View Projects
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Profile Image Card */}
          <motion.div
            className="col-span-12 sm:col-span-6 lg:col-span-4 relative"
            style={{ y: parallaxY }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden border border-border/50">
              <ProfileImage />

              {/* Info overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-emerald-400 font-medium">Available for work</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Waleed Nisar</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Faisalabad, Pakistan</span>
                </div>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                className="absolute top-5 right-5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-xl border border-border/60 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="gradient-text">5+ Years</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}

          {/* Experience Timeline Card */}
          <motion.div 
            className="col-span-12 lg:col-span-6 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative p-8 lg:p-10 rounded-[2rem] bg-card/40 border border-border/50 backdrop-blur-xl h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Experience Journey</h3>
              </div>

              <div className="space-y-1">
                {experiences.map((exp, index) => (
                  <ExperienceItem 
                    key={index} 
                    exp={exp} 
                    index={index} 
                    isInView={isInView}
                    isLast={index === experiences.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div 
            className="col-span-12 lg:col-span-6 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br from-card/60 to-card/40 border border-border/50 backdrop-blur-xl h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">What I Do</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
                ))}
              </div>

              <motion.p
                className="text-muted-foreground mt-8 leading-relaxed border-t border-border/30 pt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                Passionate about building <span className="text-foreground font-medium">scalable solutions</span> and
                mentoring the next generation of developers. Let's create something amazing together.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutSection);