import { NavLink } from 'react-router-dom';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative py-1 text-sm font-medium transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-accent after:transition-all after:duration-300 ${
          isActive
            ? 'text-accent after:w-full'
            : 'text-muted-foreground after:w-0 hover:after:w-full'
        }`
      }
    >
      {children}
    </NavLink>
  );
}
export default NavItem;