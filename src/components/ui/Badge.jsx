import { cn, getStatusBadgeClass } from '../../lib/utils';

const Badge = ({ 
  children, 
  className = '', 
  variant = 'default',
  status = null,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
  
  const variants = {
    default: 'bg-gradient-to-r from-herb-100 to-mint-100 text-herb-800 border border-herb-200/50',
    success: 'bg-gradient-to-r from-herb-100 to-mint-100 text-herb-800 border border-herb-200/50',
    warning: 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-200/50',
    error: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200/50',
    info: 'bg-gradient-to-r from-blockchain-100 to-blockchain-200 text-blockchain-800 border border-blockchain-200/50'
  };
  
  // If status is provided, use it to determine the variant
  const finalVariant = status ? getStatusBadgeClass(status) : variants[variant];
  
  return (
    <span
      className={cn(
        baseClasses,
        finalVariant,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
