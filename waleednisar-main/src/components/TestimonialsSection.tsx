import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Building2, Zap, Droplets, Shield, Settings, Wrench } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  icon: any;
  review: string;
  project: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Al-Mansour",
    role: "Facilities Director",
    company: "Commercial Tower - Riyadh",
    icon: Zap,
    review: "FGTC completed our electrical installation for a 15-floor commercial building ahead of schedule. Their attention to safety protocols and quality standards was exceptional. Every circuit was tested and documented perfectly.",
    project: "High-Rise Electrical Installation",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: 2,
    name: "Fatima Al-Qahtani",
    role: "Villa Owner",
    company: "Private Residence - Jeddah",
    icon: Droplets,
    review: "From the initial plumbing design to final installation, FGTC's team was professional and detail-oriented. They resolved a complex drainage issue and completed our bathroom renovations beautifully. No leaks, perfect pressure!",
    project: "Complete Villa Plumbing System",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 3,
    name: "Mohammed Al-Rashid",
    role: "Plant Manager",
    company: "Manufacturing Facility",
    icon: Settings,
    review: "Our HVAC system required urgent repairs during peak summer. FGTC's maintenance team responded within 2 hours and had us operational by evening. Their preventive maintenance contract has been invaluable for our uptime.",
    project: "Industrial HVAC Maintenance",
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: 4,
    name: "Noura Al-Otaibi",
    role: "Property Manager",
    company: "Retail Complex - Dammam",
    icon: Shield,
    review: "FGTC installed 45 CCTV cameras across our mall with perfect coverage. The system integration with our security office was seamless. Their team trained our staff thoroughly and response time for support is excellent.",
    project: "Mall Security & CCTV System",
    color: "from-indigo-500 to-purple-600"
  },
  {
    id: 5,
    name: "Khalid bin Abdullah",
    role: "Construction Manager",
    company: "Residential Complex Project",
    icon: Building2,
    review: "Working with FGTC on our 120-unit residential project was smooth from start to finish. They coordinated all MEP work perfectly with our construction timeline. Quality inspection passed on first attempt - that's rare!",
    project: "Multi-Unit MEP Installation",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: 6,
    name: "Aisha Al-Harbi",
    role: "Office Administrator",
    company: "Tech Company - Riyadh",
    icon: Wrench,
    review: "FGTC's technical consultation helped us redesign our office electrical layout for better efficiency. Their engineer identified cost savings of 30% in our power distribution. The retrofit was completed over a weekend with zero disruption.",
    project: "Office Electrical Optimization",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 7,
    name: "Hassan Al-Ghamdi",
    role: "Project Engineer",
    company: "Industrial Park Development",
    icon: Zap,
    review: "For our industrial facility, FGTC installed heavy-duty electrical systems including backup generators and UPS. Every safety regulation was followed precisely. Their documentation was perfect for our final inspections.",
    project: "Industrial Power Systems",
    color: "from-emerald-500 to-green-600"
  },
  {
    id: 8,
    name: "Mariam Al-Saud",
    role: "Clinic Director",
    company: "Medical Center - Jeddah",
    icon: Settings,
    review: "Medical facilities require precise climate control. FGTC designed and installed our HVAC system with separate zones for operation theaters and patient rooms. Temperature variance is less than 1°C - perfect for our needs!",
    project: "Medical Facility HVAC",
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 9,
    name: "Abdullah Al-Zahrani",
    role: "Hotel Manager",
    company: "Luxury Hotel - Makkah",
    icon: Droplets,
    review: "FGTC maintains all our plumbing and AC systems through their comprehensive AMC. With 200 rooms, we can't afford downtime. Their preventive approach and 24/7 availability has kept our guest satisfaction ratings at 98%.",
    project: "Hotel MEP Maintenance Contract",
    color: "from-sky-500 to-blue-600"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const Icon = testimonial.icon;
  
  return (
    <motion.div
      className="h-full p-7 rounded-3xl glass-card group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Quote Icon */}
      <div className="mb-5 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <Quote className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review */}
      <p className="text-foreground/80 leading-relaxed mb-6 text-base relative z-10">
        "{testimonial.review}"
      </p>

      {/* Project Tag */}
      <div className="mb-6 relative z-10">
        <span className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          {testimonial.project}
        </span>
      </div>

      {/* Author - Icon Avatar */}
      <div className="flex items-center gap-4 pt-6 border-t border-border relative z-10">
        <div className="relative">
          {/* Icon Avatar */}
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          {/* Verification Badge */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
            <span className="text-[10px] text-primary-foreground font-bold">✓</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-foreground text-base">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          <p className="text-xs text-muted-foreground/70">{testimonial.company}</p>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    whileHover={{ scale: 1.05, y: -5 }}
  >
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Icon */}
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg relative z-10">
      <Icon className="w-8 h-8 text-primary-foreground" />
    </div>

    {/* Value with animated counter effect */}
    <motion.h3
      className="text-5xl md:text-6xl font-bold gradient-text mb-2 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: delay + 0.3 }}
    >
      {value}
    </motion.h3>
    <p className="text-muted-foreground text-lg relative z-10">{label}</p>

    {/* Decorative line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsPerView = 3;
  const maxIndex = Math.ceil(testimonials.length / testimonialsPerView) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * testimonialsPerView,
    (currentIndex + 1) * testimonialsPerView
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Animated Background with Blue Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.04, 0.06, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
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
              Client Success Stories
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">What Our </span>
            <span className="gradient-text text-glow">Clients Say</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real feedback from satisfied clients across Saudi Arabia who trust FGTC for their construction and MEP needs.
          </p>
        </motion.div>

        {/* Testimonials Grid with Navigation */}
        <div className="relative mb-20">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3 mb-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full glass-card hover:border-primary/50 flex items-center justify-center transition-all duration-300 shadow-lg group"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl shadow-primary/30"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </motion.button>
          </div>

          {/* Testimonials Cards */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={Building2}
            value="500+"
            label="Projects Completed"
            delay={0.2}
          />
          <StatCard
            icon={TrendingUp}
            value="98%"
            label="Client Satisfaction"
            delay={0.4}
          />
          <StatCard
            icon={Star}
            value="15+"
            label="Years Experience"
            delay={0.6}
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
            Join hundreds of satisfied clients across Saudi Arabia
          </p>
          <motion.button
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity group shadow-2xl shadow-primary/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Project Today</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;