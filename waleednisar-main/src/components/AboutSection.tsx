import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useScroll } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
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
import AboutBackground from "./AboutBackground";
import aboutImage from "@/assets/about.png";

const experiences = [
  { year: "2024", title: "Full Stack Developer", company: "OFBS", type: "work" },
  { year: "2022", title: "Full Stack Developer", company: "Freelance", type: "work" },
  { year: "2020", title: "Junior Developer", company: "StartUp Hub", type: "work" },
  { year: "2024", title: "BS Computer Science", company: "Government College University Faisalabad", type: "education" },
];

// Animated counter with proper lifecycle
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
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
};

// Profile image with fallback and loading states
const ProfileImage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const primaryImage = aboutImage;
  const fallbackImage = aboutImage;

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* Skeleton loader */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 animate-pulse rounded-3xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: imageLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main image */}
      <motion.img
        src={imageError ? fallbackImage : primaryImage}
        alt="John Doe - Full Stack Developer"
        loading="eager"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover rounded-3xl"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView && imageLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ objectPosition: "center 20%" }}
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 mix-blend-overlay rounded-3xl" />
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden min-h-screen">
      {/* Premium Animated Background */}
      <AboutBackground />

      <motion.div ref={contentRef} className="container mx-auto px-6 relative z-10" style={{ scale: scaleProgress }}>
        {/* Section Header with cinematic reveal */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="w-16 h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />
          <span className="text-sm font-semibold text-primary tracking-[0.3em] uppercase">About Me</span>
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>

        {/* Main Bento Grid */}
        <motion.div
          className="grid grid-cols-12 gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Hero Intro Card - Main focal point */}
          <motion.div className="col-span-12 lg:col-span-8 relative group" variants={cardVariants}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-700" />

            <div className="relative p-8 lg:p-12 rounded-[2rem] bg-card/50 border border-border/50 backdrop-blur-xl overflow-hidden">
              {/* Animated gradient orb */}
              <motion.div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 60%)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--secondary) / 0.12) 0%, transparent 60%)",
                }}
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [0, -15, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                {/* Headline with proper staggered reveal */}
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
                  variants={itemVariants}
                >
                  <motion.span
                    className="block text-foreground"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    I craft
                  </motion.span>
                  <motion.span
                    className="block gradient-text text-glow"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.35 }}
                  >
                    digital experiences
                  </motion.span>
                  <motion.span
                    className="block text-foreground/90"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    that inspire & perform
                  </motion.span>
                </motion.h2>

                <motion.p
                  className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
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
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2 px-8 shadow-lg shadow-primary/25 group"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Let's Collaborate
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-border/60 hover:border-primary/50 hover:bg-primary/5 gap-2 px-8 group"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    View Projects
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Profile Image Card with premium effects */}
          <motion.div
            className="col-span-12 sm:col-span-6 lg:col-span-4 relative group"
            variants={cardVariants}
            style={{ y: parallaxY }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" />

            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden border border-border/50">
              <ProfileImage />

              {/* Info overlay with glassmorphism */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-2 mb-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-emerald-400 font-medium">Available for work</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Waleed Nisar</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Faisalabad, Pakistan</span>
                </div>
              </motion.div>

              {/* Floating experience badge */}
              <motion.div
                className="absolute top-5 right-5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-xl border border-border/60 shadow-xl"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="flex items-center gap-2 text-sm font-semibold"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="gradient-text">5+ Years</span>
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Cards - Premium glass design */}
          {[
            { value: 50, suffix: "+", label: "Projects Completed", icon: Target, color: "primary" },
            { value: 30, suffix: "+", label: "Happy Clients", icon: Users, color: "secondary" },
            { value: 99, suffix: "%", label: "Satisfaction Rate", icon: Award, color: "primary" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="col-span-4 relative group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color === "primary" ? "from-primary/20" : "from-secondary/20"} to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}
              />

              <div className="relative p-6 lg:p-7 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 h-full overflow-hidden">
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--${stat.color})) 0%, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <stat.icon
                    className={`w-8 h-8 mb-4 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`}
                  />
                </motion.div>

                <h4 className="text-4xl lg:text-5xl gradient-text mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </h4>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}

          {/* Experience Timeline Card */}
          <motion.div className="col-span-12 lg:col-span-6 relative group" variants={cardVariants}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2rem] blur-xl opacity-30" />

            <div className="relative p-8 lg:p-10 rounded-[2rem] bg-card/40 border border-border/50 backdrop-blur-xl h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Experience Journey</h3>
              </div>

              <div className="space-y-1">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-5 group/item py-4 relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.12, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    {/* Timeline */}
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        className={`w-3.5 h-3.5 rounded-full ${exp.type === "work" ? "bg-primary" : "bg-secondary"} ring-4 ring-background shadow-lg ${exp.type === "work" ? "shadow-primary/30" : "shadow-secondary/30"}`}
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring" }}
                      />
                      {index < experiences.length - 1 && (
                        <motion.div
                          className="w-0.5 h-16 bg-gradient-to-b from-border to-transparent absolute top-5"
                          initial={{ scaleY: 0 }}
                          animate={isInView ? { scaleY: 1 } : {}}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                          style={{ originY: 0 }}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="font-semibold text-foreground group-hover/item:text-primary transition-colors duration-300">
                          {exp.title}
                        </h4>
                        <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full shrink-0 border border-border/50">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills/What I Do Card */}
          <motion.div className="col-span-12 lg:col-span-6 relative group" variants={cardVariants}>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-primary/10 to-secondary/15 rounded-[2rem] blur-xl opacity-40" />

            <div className="relative p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br from-card/60 to-card/40 border border-border/50 backdrop-blur-xl h-full overflow-hidden">
              {/* Background decorations */}
              <motion.div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.2, 1], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)",
                }}
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
                    <Zap className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">What I Do</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Frontend Dev", desc: "React, Next.js, Vue", gradient: "from-blue-500/10 to-cyan-500/10" },
                    { name: "Backend Dev", desc: "Node.js, Python, Go", gradient: "from-purple-500/10 to-pink-500/10" },
                    { name: "Database", desc: "PostgreSQL, MongoDB", gradient: "from-green-500/10 to-emerald-500/10" },
                    {
                      name: "Cloud & DevOps",
                      desc: "AWS, Docker, CI/CD",
                      gradient: "from-orange-500/10 to-red-500/10",
                    },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className={`relative p-5 rounded-xl bg-gradient-to-br ${skill.gradient} border border-border/40 hover:border-primary/40 transition-all duration-500 group/skill overflow-hidden`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.03, y: -3 }}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-500" />
                      <h4 className="font-semibold text-foreground group-hover/skill:text-primary transition-colors relative z-10">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1.5 relative z-10">{skill.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  className="text-muted-foreground mt-8 leading-relaxed border-t border-border/30 pt-6"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  Passionate about building <span className="text-foreground font-medium">scalable solutions</span> and
                  mentoring the next generation of developers. Let's create something amazing together.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
