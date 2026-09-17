const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
  default: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
  secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-muted',
  outline: 'border border-border bg-card text-foreground hover:bg-muted shadow-sm',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  danger: 'bg-danger text-white hover:opacity-90 shadow-sm',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-[6px]
        font-medium
        transition-all duration-150
        active:scale-[0.98]
        disabled:pointer-events-none disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    />
  );
}

export default Button;