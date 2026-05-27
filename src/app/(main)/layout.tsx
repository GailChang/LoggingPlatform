'use client'

import Navbar from '@/components/Navbar';

const MainLayout:React.FC<React.PropsWithChildren> = ({ children }) => {
    // const []

  return (
    <>
    {/* <Navbar /> */}
    {children}
    </>
    );
};

export default MainLayout;