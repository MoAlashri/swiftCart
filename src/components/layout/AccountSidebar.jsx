// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

// /* =========================================
//    Static data — منفصلة عن الكومبوننت عشان
//    لو زادت اللينكات منزحمش الكود
//    ========================================= */

// const ACCOUNT_LINKS = [
//   { name: 'My Orders', path: '/account/orders', icon: Package, badge: 3 },
//   { name: 'Wishlist', path: '/account/wishlist', icon: Heart, badge: 5 },
//   { name: 'Settings', path: '/account/settings', icon: Settings, badge: null },
// ];

// // استبدلها ببيانات المستخدم الحقيقية من الـ auth context
// const MOCK_USER = {
//   name: 'Sarah Ahmed',
//   email: 'sarah.ahmed@example.com',
//   initials: 'SA',
// };

// export default function AccountSidebar({ onLogout }) {
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   const handleLogoutClick = () => setShowLogoutConfirm(true);
//   const confirmLogout = () => {
//     setShowLogoutConfirm(false);
//     onLogout?.();
//   };

//   return (
//     <>
//       {/* نسخة الموبايل: تابات أفقية قابلة للسكرول */}
//       <MobileTabs onLogoutClick={handleLogoutClick} />

//       {/* نسخة الديسكتوب: سيدبار ثابت */}
//       <aside className="hidden lg:block w-64 shrink-0">
//         <div className="sticky top-20 space-y-6">
//           <UserCard />

//           <nav className="space-y-1">
//             {ACCOUNT_LINKS.map((link) => (
//               <SidebarLink key={link.path} {...link} />
//             ))}

//             <button
//               onClick={handleLogoutClick}
//               className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </button>
//           </nav>
//         </div>
//       </aside>

//       {showLogoutConfirm && (
//         <LogoutConfirmDialog
//           onCancel={() => setShowLogoutConfirm(false)}
//           onConfirm={confirmLogout}
//         />
//       )}
//     </>
//   );
// }

// /* =========================================
//    Sub-components
//    ========================================= */

// const UserCard = () => (
//   <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-4">
//     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
//       {MOCK_USER.initials}
//     </div>
//     <div className="min-w-0">
//       <p className="truncate text-sm font-medium text-foreground">{MOCK_USER.name}</p>
//       <p className="truncate text-xs text-muted-foreground">{MOCK_USER.email}</p>
//     </div>
//   </div>
// );

// const SidebarLink = ({ name, path, icon: Icon, badge }) => (
//   <NavLink
//     to={path}
//     className={({ isActive }) =>
//       `flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
//         isActive
//           ? 'bg-primary/10 text-primary'
//           : 'text-muted-foreground hover:bg-muted hover:text-foreground'
//       }`
//     }
//   >
//     {({ isActive }) => (
//       <>
//         <span className="flex items-center gap-3">
//           <Icon className="h-4 w-4" />
//           {name}
//         </span>
//         {badge ? (
//           <span
//             className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
//               isActive ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
//             }`}
//           >
//             {badge}
//           </span>
//         ) : (
//           <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
//         )}
//       </>
//     )}
//   </NavLink>
// );

// const MobileTabs = ({ onLogoutClick }) => (
//   <div className="border-b border-border pb-3 lg:hidden">
//     <div className="mb-3 flex items-center gap-3 px-1">
//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
//         {MOCK_USER.initials}
//       </div>
//       <div className="min-w-0">
//         <p className="truncate text-sm font-medium text-foreground">{MOCK_USER.name}</p>
//         <p className="truncate text-xs text-muted-foreground">{MOCK_USER.email}</p>
//       </div>
//     </div>

//     <div className="flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//       {ACCOUNT_LINKS.map(({ name, path, icon: Icon, badge }) => (
//         <NavLink
//           key={path}
//           to={path}
//           className={({ isActive }) =>
//             `flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
//               isActive
//                 ? 'border-primary bg-primary/10 text-primary'
//                 : 'border-border text-muted-foreground hover:bg-muted'
//             }`
//           }
//         >
//           <Icon className="h-3.5 w-3.5" />
//           {name}
//           {badge ? <span className="text-xs text-muted-foreground/70">({badge})</span> : null}
//         </NavLink>
//       ))}

//       <button
//         onClick={onLogoutClick}
//         className="flex shrink-0 items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
//       >
//         <LogOut className="h-3.5 w-3.5" />
//         Logout
//       </button>
//     </div>
//   </div>
// );

// const LogoutConfirmDialog = ({ onCancel, onConfirm }) => (
//   <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
//     <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150" onClick={onCancel} />
//     <div className="relative w-full max-w-sm rounded-lg border border-border bg-popover p-5 shadow-lg animate-in zoom-in-95 duration-150">
//       <h3 className="text-sm font-semibold text-popover-foreground">Log out of your account?</h3>
//       <p className="mt-1.5 text-sm text-muted-foreground">
//         You'll need to sign in again to view your orders and wishlist.
//       </p>
//       <div className="mt-5 flex justify-end gap-2">
//         <button
//           onClick={onCancel}
//           className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onConfirm}
//           className="rounded-md bg-destructive px-3.5 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
//         >
//           Log out
//         </button>
//       </div>
//     </div>
//   </div>
// );