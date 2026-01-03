import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Sparkles, ArrowRight } from 'lucide-react';
import TestimonialsBackground from './backgrounds/TestimonialsBackground';
import { TextReveal } from './TextReveal';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechVision",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    review: "Working with this team was an absolute pleasure. They transformed our vision into a stunning digital reality that exceeded all expectations."
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder, StartupLab",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    review: "Exceptional creativity and technical expertise. Our conversion rates increased by 40% after the redesign. Highly recommended!"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    review: "A true professional who understands both design and business goals. The collaborative process was smooth and efficient."
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, InnovateTech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    review: "Outstanding technical skills combined with a keen eye for design. They delivered a complex web application that's beautiful."
  },
  {
    id: 5,
    name: "Laura Bennett",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    review: "As a small business owner, I appreciated how stress-free the process was. The results speak for themselves!"
  },
  {
    id: 6,
    name: "Michael Lee",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    review: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience."
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-[380px] p-7 rounded-3xl glass-card group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Quote Icon */}
      <div className="mb-5 relative z-10">
        <Quote className="w-10 h-10 text-primary/40" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review */}
      <p className="text-foreground/80 leading-relaxed mb-7 text-base relative z-10">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-[10px] text-primary-foreground">✓</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon: Icon, value, label, delay }: { icon: any; value: string; label: string; delay: number }) => (
  <motion.div
    className="relative p-8 rounded-3xl glass-card overflow-hidden group"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
  >
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Icon */}
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-primary-foreground" />
    </div>

    {/* Value with animated counter effect */}
    <motion.h3
      className="text-5xl md:text-6xl font-bold gradient-text mb-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay + 0.3 }}
    >
      {value}
    </motion.h3>
    <p className="text-muted-foreground text-lg">{label}</p>

    {/* Decorative line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Testimonials Background */}
      <TestimonialsBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-card mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium tracking-wider uppercase">
              Testimonials
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">What My </span>
            <span className="gradient-text text-glow">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Their trust and satisfaction motivate me to continue delivering designs that make an impact.
          </p>
        </motion.div>

        {/* Testimonials Marquee - Row 1 */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...row1, ...row1, ...row1].map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} index={index % 3} />
            ))}
          </motion.div>
        </div>

        {/* Testimonials Marquee - Row 2 (Reverse direction) */}
        <div className="mb-20 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...row2, ...row2, ...row2].map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} index={index % 3} />
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <StatCard
            icon={Users}
            value="98%"
            label="Client Satisfaction Rate"
            delay={0.2}
          />
          <StatCard
            icon={TrendingUp}
            value="200%"
            label="Average Revenue Growth"
            delay={0.4}
          />
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-6 text-lg">
            Ready to become the next success story?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Work Together</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
