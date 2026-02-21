import { cn } from '../../lib/utils';

const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'default',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-gradient-to-r from-herb-500 to-mint-500 hover:from-herb-600 hover:to-mint-600 text-white focus:ring-herb-400 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-earth-200 to-earth-300 hover:from-earth-300 hover:to-earth-400 text-herb-800 focus:ring-earth-400 shadow-md hover:shadow-lg',
    outline: 'border border-herb-300 bg-transparent hover:bg-gradient-to-r hover:from-herb-50 hover:to-mint-50 text-herb-700 focus:ring-herb-400',
    ghost: 'bg-transparent hover:bg-gradient-to-r hover:from-herb-50 hover:to-mint-50 text-herb-700 focus:ring-herb-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-400 shadow-lg hover:shadow-xl'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
