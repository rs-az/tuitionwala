import Footer from './Footer';
import Header from './Header';
import JobCarousel from './JobCarousel';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const showHeader = router.pathname === '/jobs' ? false : true;
  console.log(router.pathname);
  return (
    <>
      <Header />
      {children}
      {showHeader && <JobCarousel />}
      <Footer />
    </>
  );
};

export default Layout;
