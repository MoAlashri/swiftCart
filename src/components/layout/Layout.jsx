import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';   
import Footer from './Footer';
import CategoryNav from './CategoryNav';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CategoryNav />
      <main className="flex-1 container mx-auto py-8">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}