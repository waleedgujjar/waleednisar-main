import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import FAQBackground from './backgrounds/FAQBackground';
import { TextReveal } from './TextReveal';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "I offer a comprehensive range of digital services including UI/UX design, web development, branding, and graphic design. From wireframing and prototyping to full-stack development, I can help bring your vision to life with modern, responsive, and user-friendly solutions."
  },
  {
    id: 2,
    question: "How does the design process work?",
    answer: "My design process begins with understanding your goals and target audience. I then move through discovery, wireframing, visual design, and development phases. Throughout each stage, I maintain open communication and iterate based on your feedback to ensure the final product exceeds expectations."
  },
  {
    id: 3,
    question: "How long does a project usually take?",
    answer: "Project timelines vary based on complexity and scope. A simple landing page might take 1-2 weeks, while a complete brand identity or complex web application could take 4-8 weeks. I'll provide a detailed timeline during our initial consultation."
  },
  {
    id: 4,
    question: "What do I need to provide before starting a project?",
    answer: "To get started, I typically need your brand guidelines (if available), content and copy, any specific design references you like, and clear goals for the project. Don't worry if you don't have everything—I can help guide you through what's needed."
  },
  {
    id: 5,
    question: "Do you offer revisions?",
    answer: "Yes! All my projects include revision rounds to ensure you're completely satisfied with the result. The number of revisions depends on the project scope, but I always work collaboratively to get things right."
  },
  {
    id: 6,
    question: "How do I get started?",
    answer: "Getting started is easy! Simply reach out through the contact form or email me directly. We'll schedule a discovery call to discuss your project, goals, and timeline. From there, I'll provide a proposal and we can begin bringing your ideas to life."
  },
];

const FAQItem = ({ 
  item, 
  isOpen, 
  onToggle, 
  index 
}: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div 
        className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen ? 'border-primary/40' : 'hover:border-primary/20'
        }`}
      >
        {/* Question Header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left"
        >
          <div className="flex items-center gap-4 flex-1">
            <motion.span 
              className="text-sm font-mono text-primary"
              animate={{ opacity: isOpen ? 1 : 0.6 }}
            >
              {String(item.id).padStart(2, '0')}.
            </motion.span>
            <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
              isOpen ? 'gradient-text' : 'text-foreground group-hover:text-primary'
            }`}>
              {item.question}
            </h3>
          </div>
          
          <motion.div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
              isOpen 
                ? 'bg-gradient-to-br from-primary to-secondary' 
                : 'bg-muted/50 group-hover:bg-primary/20'
            }`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Plus className="w-5 h-5 text-foreground" />
            )}
          </motion.div>
        </button>

        {/* Answer Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 }
              }}
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="pl-10 md:pl-12 border-l-2 border-primary/30"
                >
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* FAQ Background */}
      <FAQBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-6 py-2.5 rounded-full glass-card text-sm text-primary font-medium tracking-wider uppercase mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            FAQ
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Frequently Asked </span>
            <span className="gradient-text text-glow">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Here are answers to some of the most common questions I receive.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
