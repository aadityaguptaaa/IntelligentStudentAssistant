import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  glass?: boolean;
}

export const Card = ({ children, className = '', gradient = false, glass = false }: CardProps) => {
  const baseStyles = 'rounded-xl shadow-lg p-6 transition-all duration-300';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-[#f0f0ff] border-2 border-[#6C63FF]/20' : 'bg-white';
  const glassStyles = glass ? 'backdrop-blur-lg bg-white/70 border border-white/20' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`${baseStyles} ${gradient ? gradientStyles : ''} ${glass ? glassStyles : 'bg-white'} ${className}`}
    >
      {children}
    </motion.div>
  );
};
