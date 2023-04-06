import { TimelineExperienceItem } from '../../../data/dataDef';

/* eslint-disable @typescript-eslint/no-shadow */
export const groupBy = (
  array: TimelineExperienceItem[],
  predicate: (value: TimelineExperienceItem, index: number, array: TimelineExperienceItem[]) => string,
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: TimelineExperienceItem[] });
