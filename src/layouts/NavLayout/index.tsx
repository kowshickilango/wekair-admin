import NavBar from '@/components/NavBar/NavBar.component';
import { ReactNode } from 'react';

const NavLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default NavLayout;
