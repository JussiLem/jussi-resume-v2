import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../src/components/Layout/Page';
import About from '../src/components/Sections/About';
// import Contact from '../src/components/Sections/Contact';
import Footer from '../src/components/Sections/Footer';
import Hero from '../src/components/Sections/Hero';
// import Portfolio from '../src/components/Sections/Portfolio';
import Resume from '../src/components/Sections/Resume';
// import Testimonials from '../src/components/Sections/Testimonials';
import {homePageMeta} from '../src/data/data';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../src/components/Sections/Header'), {ssr: false});

const Home: FC = memo(() => {
  const {title, description} = homePageMeta;
  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About />
      <Resume />
      {/* <Portfolio />
      <Testimonials />
      <Contact /> */}
      <Footer />
    </Page>
  );
});

export default Home;