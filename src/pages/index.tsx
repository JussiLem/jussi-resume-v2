import { Amplify } from 'aws-amplify';
import dynamic from 'next/dynamic';
import { FC, memo } from 'react';
import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
// import Portfolio from '../src/components/Sections/Portfolio';
import Resume from '../components/Sections/Resume';
// import Testimonials from '../src/components/Sections/Testimonials';
import { homePageMeta } from '../data/data';
import { ResumeData } from '../data/dataDef';
import { getResumeData } from '../lib/getResumeData';

Amplify.configure({
  identityPoolId: process.env.IDENTITY_POOL_ID,
  region: process.env.DEFAULT_REGION,
  userPoolId: process.env.USER_POOL_ID,
  userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
  ssr: true,
});
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), { ssr: false });

const Home: FC<{
  resume?: ResumeData;
  error?: string;
}> = memo(({ resume }) => {
  const { title, description } = homePageMeta;
  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About />
      {resume ? (
        <Resume
          skills={resume.skills}
          certs={resume.certs}
          experience={resume.experience}
          education={resume.education}
        />
      ) : (
        <></>
      )}
      {/* <Portfolio />
      <Testimonials /> */}
      <Contact />
      <Footer />
    </Page>
  );
});

export default Home;

export const getServerSideProps: () => Promise<{
  props: {
    resume?: ResumeData;
    error?: string;
  };
}> = async () => {
  try {
    return {
      props: {
        resume: await getResumeData(),
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.message,
      },
    };
  }
};
