import { FC, memo } from 'react';

import { groupBy } from './common';
import ResumeSection from './ResumeSection';
import { SkillGroup } from './Skills';
import TimelineItem from './TimelineItem';
import { certifications, education, experience, SectionId, skills } from '../../../data/data';
// import { TimelineItem } from '../../../data/dataDef';
import Section from '../../Layout/Section';

const TimelineWorkItem: FC<{ work: TimelineItem }> = memo(({ work }) => {
  const { title, date, content, endDate } = work;
  return (
    <div className="grid md:grid-cols-3 pb-2">
      <div className="col-start-1 pb-2">
        <h3 className="text-l font-medium font-bold">{title}</h3>
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

const Resume: FC = memo(() => {
  const grouped = groupBy(
    experience.sort((a, b) => b.date.localeCompare(a.date)),
    v => v.location,
  );
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Work">
          {Object.entries(grouped).map(([k, v]) => (
            <div className="pb-8 text-center last:pb-0 md:text-left">
              <div className="col-span-1 pb-4">
                <h2 className="text-xl font-bold pb-1">{k}</h2>
                {v.map(work => (
                  <TimelineWorkItem work={work} />
                ))}
              </div>
            </div>
          ))}
        </ResumeSection>
        <ResumeSection title="Education">
          {education.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Certificates">
          {certifications.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Skills">
          <p className="pb-8">Here you can show a snapshot of your skills to show off to employers</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skillgroup, index) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
