const variantStyles = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  accent: "bg-accent/10 text-accent",
};

function Badge({variant = "default", className="", children, ...props}) {
  return (
    <span className={
      `inline-flex
      items-center
      rounded-full
      px-2.5 
      py-1 
      text-xs 
      font-medium 
      ${variantStyles[variant]} 
      ${className}`} 
      {...props}>
        {children}
    </span>
  )
}

export default Badge;