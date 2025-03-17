import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: ReactNode; 
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200/50 h-auto">
      <Toaster richColors position='top-center'/> 
      <main className="flex-grow">{children}</main> 
    </div>
  );
};

export default Layout;
