import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { SectionTransition, BlurFade } from '@/components/PageTransition';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setContentVisible(true), 100);
  };

  return (
    <>
      
      
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SmoothScroll>
              <Navbar />
              <main className="overflow-hidden">
                <HeroSection />
                
                <SectionTransition>
                  <AboutSection />
                </SectionTransition>
                
                <SectionTransition delay={0.05}>
                  <SkillsSection />
                </SectionTransition>
                
                <SectionTransition delay={0.05}>
                  <ProjectsSection />
                </SectionTransition>
                
                <SectionTransition delay={0.05}>
                  <TestimonialsSection />
                </SectionTransition>
                
                <BlurFade delay={0.1}>
                  <FAQSection />
                </BlurFade>
                
                <SectionTransition delay={0.05}>
                  <ContactSection />
                </SectionTransition>
              </main>
              <Footer />
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
