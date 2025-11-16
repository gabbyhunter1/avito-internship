import { Navbar } from '@/components/navbar.tsx';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="bg-background">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default Layout;
