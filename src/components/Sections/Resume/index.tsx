import { FC, memo } from 'react';

import ResumeSection from './ResumeSection';
import { SkillGroup } from './Skills';
import TimelineItem from './TimelineItem';
import { SectionId } from '../../../data/data';
import { TimelineExperienceItem } from '../../../data/dataDef';
import Section from '../../Layout/Section';

const TimelineExperienceItem: FC<{ work: TimelineItem }> = memo(({ work }) => {
  const { title, date, content, endDate } = work;
  return (
    <div className="grid md:grid-cols-3 pb-2">
      <div className="col-start-1 pb-2">
        <h3 className="text-l font-medium">{title}</h3>
        <div className="">
          <span className="text-sm md:justify-start">
            {date} {endDate ? `- ${endDate}` : null}
          </span>
        </div>
      </div>
      <div className="col-start-2 col-span-2">{content}</div>
    </div>
  );
});

const ExperienceItems: FC<{ key: string; items: TimelineItem[] }> = memo(({ key, items }) => {
  return (
    <div className="pb-8 text-center last:pb-0 md:text-left">
      <div className="col-span-1 pb-4">
        <h2 className="text-xl font-bold pb-1">{key}</h2>
        {items.map(work => (
          <TimelineExperienceItem work={work} />
        ))}
      </div>
    </div>
  );
});

const Resume: FC<{
  experience: { [p: string]: TimelineExperienceItem[] };
  certs: TimelineItem[];
  education: TimelineItem[];
  skills: any[];
}> = memo(({ experience, certs, education, skills }) => {
  return (
    <Section className="dark:text-white" sectionId={SectionId.Resume}>
      <div className="flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Experience">
          {Object.entries(experience).map(([key, items]) => (
            <ExperienceItems key={key} items={items} />
          ))}
        </ResumeSection>
        <ResumeSection title="Education">
          {education.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Certificates">
          {certs.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Skills">
          <p className="pb-8">Here you can show a snapshot of your skills to show off to employers</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skillGroup, index) => (
              <SkillGroup key={`${skillGroup.name}-${index}`} skillGroup={skillGroup} />
            ))}
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
