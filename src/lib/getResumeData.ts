import { groupBy } from '../components/Sections/Resume/common';
import { certifications, education as edu, experience as exp, skills as skls } from '../data/data';
import { ResumeData, SkillGroup, TimelineExperienceItem, TimelineItem } from '../data/dataDef';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export const getResumeData: () => Promise<ResumeData> = async () => {
  await sleep(1000);
  const grouped = groupBy(
    exp.sort((a, b) => b.date.localeCompare(a.date)),
    v => v.location,
  );
  return {
    experience: JSON.parse(JSON.stringify(grouped)) as { [p: string]: TimelineExperienceItem[] },
    education: JSON.parse(JSON.stringify(edu)) as TimelineItem[],
    certs: JSON.parse(JSON.stringify(certifications)) as TimelineItem[],
    skills: JSON.parse(JSON.stringify(skls)) as SkillGroup[],
  };
};
