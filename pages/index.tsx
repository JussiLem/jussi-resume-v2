import dynamic from 'next/dynamic';
import { FC, memo } from 'react';
import Page from '../src/components/Layout/Page';
import About from '../src/components/Sections/About';
import Contact from '../src/components/Sections/Contact';
import Footer from '../src/components/Sections/Footer';
import Hero from '../src/components/Sections/Hero';
// import Portfolio from '../src/components/Sections/Portfolio';
import Resume from '../src/components/Sections/Resume';
// import Testimonials from '../src/components/Sections/Testimonials';
import { groupBy } from '../src/components/Sections/Resume/common';
import { certifications, education as edu, experience as exp, homePageMeta, skills as skls } from '../src/data/data';
import { SkillGroup, TimelineExperienceItem, TimelineItem } from '../src/data/dataDef';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../src/components/Sections/Header'), { ssr: false });

const Home: FC<{
  experience: { [p: string]: TimelineExperienceItem[] };
  education: TimelineItem[];
  certs: TimelineItem[];
  skills: SkillGroup[];
}> = memo(({ experience, education, certs, skills }) => {
  const { title, description } = homePageMeta;
  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About />
      <Resume skills={skills} certs={certs} experience={experience} education={education} />
      {/* <Portfolio />
      <Testimonials /> */}
      <Contact />
      <Footer />
    </Page>
  );
});

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export const getStaticProps = async () => {
  await sleep(1000);
  const grouped = groupBy(
    exp.sort((a, b) => b.date.localeCompare(a.date)),
    v => v.location,
  );
  return {
    props: {
      experience: JSON.parse(JSON.stringify(grouped)) as { [p: string]: TimelineExperienceItem[] },
      education: JSON.parse(JSON.stringify(edu)) as TimelineItem[],
      certs: JSON.parse(JSON.stringify(certifications)) as TimelineItem[],
      skills: JSON.parse(JSON.stringify(skls)) as SkillGroup[],
    },
  };
};

export default Home;
