function Select({
  className = '',
  children,
  ...props
}) {
  return (
    <select className= {`
    h-10 
    w-full
    rounded-md
    border
    py-2
    px-3
    bg-background
    text-sm 
    text-foreground
    border-border
    outline-none
    transition
    focus:ring-2
    cursor-pointer
    focus:ring-primary/30
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${className}`} {...props} >
      {children}
    </select>
  )
}

export default Select;