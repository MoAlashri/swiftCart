const variantStyles = {
  primary: 'bg-primary text-white hover:opacity-90',
  default: 'bg-primary text-white hover:opacity-90', // ✅ alias لـ primary
  secondary: 'bg-secondary text-white hover:opacity-90',
  outline: 'border border-border bg-transparent hover:bg-muted',
  ghost: 'bg-transparent hover:bg-muted',
  danger: 'bg-red-500 text-white hover:opacity-90',
};
const sizeStyles = {
  sm :"h-8 px-3 text-sm",
  md :"h-10 px-4 text-base",
  lg :"h-12 px-6 text-lg",
}

function Button({
  variant = 'default',
  size = 'md',
  className= "",
  ...props
}) {
  return (
  <button  className ={`
    items-center 
    inline-flex
    gap-2
    justify-center
    rounded-md
    font-medium
    transition-opacity
    disabled:pointer-events-none  
      disabled:opacity-50
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
    `}
    {...props}/>
    
  )
}

export default Button;