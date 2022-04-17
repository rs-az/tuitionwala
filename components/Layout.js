import Footer from './Footer';
import Header from './Header';
import JobCarousel from './JobCarousel';
import { useRouter } from 'next/router';
import SiteMaintenance from './SiteMaintenance';

const Layout = ({ children }) => {
  const router = useRouter();
  const showHeader = router.pathname === '/jobs' ? false : true;
  console.log(router.pathname);
  return (
    <>
      <SiteMaintenance />
      {/* <Header /> */}
      {children}
      {/* {showHeader && <JobCarousel />} */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
