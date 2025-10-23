import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#6C63FF] to-[#5a52d5] hover:from-[#5a52d5] hover:to-[#4a42c5] text-white',
    secondary: 'bg-white text-[#6C63FF] border-2 border-[#6C63FF] hover:bg-[#6C63FF] hover:text-white',
    accent: 'bg-gradient-to-r from-[#00C9A7] to-[#00b396] hover:from-[#00b396] hover:to-[#009d85] text-white',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
