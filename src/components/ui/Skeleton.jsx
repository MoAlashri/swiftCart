function Skeleton({
  className = "",
  ...props
}) {
  return (
    <div
    aria-hidden="true"
    className={`bg-muted  animate-pulse ${className} `}
    {...props}
    />
  )
}

export default Skeleton;