import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; // استدعاء الـ Navbar الحقيقي
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}