import { useState, useRef } from 'react';
import aboutImage from "@/assets/about.png";
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ContactBackground from './backgrounds/ContactBackground';
import { TextReveal } from './TextReveal';

const services = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'branding', label: 'Branding' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'development', label: 'Development' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setTimeout(() => {
      setFormData({ name: '', email: '', service: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Contact Background */}
      <ContactBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Heading & Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl">👋</span>
              <span className="text-sm font-medium text-muted-foreground">Hi</span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Let's work </span>
              <span className="gradient-text text-glow">together</span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-lg">
              Let's build something impactful together—whether it's your brand, your website, or your next big idea.
            </p>

            {/* Profile Image with floating elements */}
            <div className="relative max-w-md">
              <motion.div
                className="relative rounded-3xl overflow-hidden aspect-square"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
               <div className="relative w-full h-full overflow-hidden rounded-3xl group">
  {/* IMAGE (BOTTOM LAYER) */}
  <img
    src={aboutImage}
    alt="Profile"
    loading="lazy"
    className="
      w-full 
      h-full 
      object-contain 
      object-top
      transition-transform duration-700
      group-hover:scale-[1.05]
    "
  />

  {/* GRADIENT OVERLAY (SOFT, NOT BLOCKING) */}
  <div
    className="
      absolute inset-0 
      bg-gradient-to-br 
      from-primary/20 
      via-transparent 
      to-secondary/20
      pointer-events-none
    "
  />
</div>
                {/* Floating badges */}
                <motion.div
                  className="absolute top-6 right-6 px-4 py-2 rounded-full glass-card z-20 flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border-2 border-primary/30 z-0"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Quick Contact Info */}
            <div className="mt-12 space-y-4">
              <motion.a
                href="mailto:waleednisar43@gmail.com"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors">waleednisar43@gmail.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <motion.a
                href="tel:+923001234567"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium group-hover:text-primary transition-colors">+92 315 61 64430</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Faisalabad, Pakistan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
              {/* Form background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="h-14 bg-muted/30 border-border/50 focus:border-primary rounded-xl text-lg"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="h-14 bg-muted/30 border-border/50 focus:border-primary rounded-xl text-lg"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-medium text-muted-foreground">
                    Service Needed?
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-14 bg-muted/30 border border-border/50 focus:border-primary rounded-xl text-lg px-4 appearance-none cursor-pointer text-foreground"
                  >
                    <option value="" className="bg-card">Select...</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value} className="bg-card">
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
                    What Can I Help You...
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-muted/30 border-border/50 focus:border-primary resize-none rounded-xl text-lg"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-lg font-semibold group relative overflow-hidden"
                  disabled={isSubmitting || isSubmitted}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Submit
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
