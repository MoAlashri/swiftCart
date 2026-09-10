function Input({
  className ="",
  ...Props
}) {
  return (
    <input className = {`
      flex
      h-10
      w-full
      rounded-md
      border
      border-border
      bg-background
      text-sm
      text-foreground
      px-3
      py-2
      outline-none
      transition
      focus:ring-2
      focus:ring-primary/30
      disabled:cursor-not-allowed
      disabled:opacity-50
      placeholder:text-muted-foreground
      ${className}
      `}{...Props} /> 
  )
}

export default Input;