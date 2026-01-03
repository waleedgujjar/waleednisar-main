import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AboutBackground from './AboutBackground';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:john@example.com', label: 'Email' },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      {/* Interactive 3D Background */}
      <Suspense fallback={null}>
        <AboutBackground />
      </Suspense>

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16 px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#home" className="text-3xl font-bold gradient-text inline-block mb-4">
              WN
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Full Stack Developer crafting exceptional digital experiences from Faisalabad, Pakistan.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to my newsletter for updates on new projects and blog posts.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none transition-colors text-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {currentYear} Waleed Nisar. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" /> in Pakistan
          </motion.p>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="rounded-full border-border hover:border-primary/50 gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
