import { useEffect, useRef, useState, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/about-2.png";

gsap.registerPlugin(ScrollTrigger);

const titles = ["Full Stack Developer", "React Specialist", "Node.js Expert", "UI/UX Enthusiast"];

const techStack = ["React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "Next.js", "TailwindCSS", "GraphQL"];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:john@example.com", label: "Email" },
];

const HeroSection = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const leftTextX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const leftTextY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rightTextX = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rightTextY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Spring physics for smoother parallax
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });
  const smoothLeftX = useSpring(leftTextX, { stiffness: 100, damping: 30 });
  const smoothRightX = useSpring(rightTextX, { stiffness: 100, damping: 30 });

  // Typing effect
  useEffect(() => {
    const title = titles[currentTitle];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < title.length) {
            setDisplayText(title.substring(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(title.substring(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentTitle((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-name", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-title-left", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".hero-title-right", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".hero-image", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".hero-cta", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".tech-badge", {
        scale: 0,
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
        delay: 1.1,
        ease: "back.out(1.5)",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Jaw-dropping Background */}
      <Suspense fallback={null}>
        <HeroBackground />
      </Suspense>

      {/* Main Content with parallax */}
      <motion.div
        ref={containerRef}
        className="relative z-10 container-custom px-6 w-full"
        style={{ opacity, scale: contentScale }}
      >
        {/* Name Badge with enhanced styling */}
        <motion.div
          className="hero-name flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium border border-primary/10 backdrop-blur-xl"
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0.4)",
                  "0 0 0 8px rgba(16, 185, 129, 0)",
                  "0 0 0 0 rgba(16, 185, 129, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Sparkles className="w-3 h-3 text-primary/60" />
            Available for work
          </motion.span>
        </motion.div>

        {/* Split Title Layout with Center Image - Enhanced parallax */}
        <div className="relative flex items-center justify-center min-h-[380px] md:min-h-[450px]">
          {/* Left Title with enhanced parallax */}
          <motion.div
            className="hero-title-left absolute left-0 md:left-[8%] lg:left-[12%] z-10"
            style={{ x: smoothLeftX, y: leftTextY }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter">
              <motion.span
                className="block text-foreground drop-shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
                whileHover={{ x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                FULL
              </motion.span>
              <motion.span
                className="block text-foreground drop-shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
                whileHover={{ x: -15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                STACK
              </motion.span>
            </h1>
          </motion.div>

          {/* Center Image with enhanced effects */}
          <motion.div
            className="hero-image relative z-20"
            style={{ y: smoothImageY, scale: imageScale, rotate: imageRotate }}
          >
            <div className="relative">
              {/* Multi-layer glow effect */}
              <motion.div
                className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-60"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Orbiting ring */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)" }}
                />
              </motion.div>

              {/* Profile Image Container */}
              <motion.div
                className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-border/50 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              {/* Wave badge with enhanced animation */}
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.4), 0 10px 30px -10px hsl(var(--primary) / 0.5)" }}
              >
                <span className="text-2xl md:text-3xl">👋</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Title with enhanced parallax */}
          <motion.div
            className="hero-title-right absolute right-0 md:right-[8%] lg:right-[12%] z-10 text-right"
            style={{ x: smoothRightX, y: rightTextY }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter">
              <motion.span
                className="block gradient-text drop-shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                DEVEL
              </motion.span>
              <motion.span
                className="block gradient-text drop-shadow-lg"
                style={{ fontFamily: "var(--font-display)" }}
                whileHover={{ x: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                OPER
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle text-center mt-6 md:mt-8">
          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            I'm a Pakistan-based full stack developer crafting
            <span className="text-foreground font-medium"> modern web experiences</span>
          </p>
        </div>

        {/* Animated Typing Role */}
        <motion.div
          className="h-8 md:h-10 mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-lg md:text-xl font-medium text-primary code-font">
            {displayText}
            <motion.span
              className="inline-block w-0.5 h-5 md:h-6 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </h2>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <motion.div className="hero-cta">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-7 py-5 text-base font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02] rounded-full"
              onClick={() => {
                const projectsSection = document.getElementById("projects");
                projectsSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
            </Button>
          </motion.div>
          <motion.div className="hero-cta">
            <Button
              size="lg"
              variant="outline"
              className="px-7 py-5 text-base font-medium border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 rounded-full"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-button flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.08 }}
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="tech-badge px-3 py-1.5 rounded-full glass-card text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium tracking-wider">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
