import { withSSRContext } from 'aws-amplify';
import { groupBy } from '../components/Sections/Resume/common';
import { certifications, education as edu, experience as exp, skills as skls } from '../data/data';
import { ResumeData, SkillGroup, TimelineExperienceItem, TimelineItem } from '../data/dataDef';

export const getResumeData: () => Promise<ResumeData> = async () => {
  const apiName = 'MyApiName';
  const path = '/path';
  const myInit = {
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      name: 'param', // OPTIONAL
    },
  };
  const grouped = groupBy(
    exp.sort((a, b) => b.date.localeCompare(a.date)),
    v => v.location,
  );
  const SSR = withSSRContext();
  try {
    const response = await SSR.API.get(apiName, path, myInit);
    JSON.parse(response.data);

    return {
      experience: JSON.parse(JSON.stringify(grouped)) as { [p: string]: TimelineExperienceItem[] },
      education: JSON.parse(JSON.stringify(edu)) as TimelineItem[],
      certs: JSON.parse(JSON.stringify(certifications)) as TimelineItem[],
      skills: JSON.parse(JSON.stringify(skls)) as SkillGroup[],
    };
  } catch (e) {
    console.log(e)
    throw Error(`Unable to fetch data: ${e}`);
  }
};
