function IconButton({ icon: Icon, label, className = '', onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${className}`}
    >
      <Icon className="h-5 w-5" />
      {children}
    </button>
  );
}

export default IconButton;