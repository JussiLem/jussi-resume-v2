import { TimelineItem } from '../../../data/dataDef';

/* eslint-disable @typescript-eslint/no-shadow */
export const groupBy = (
  array: TimelineItem[],
  predicate: (value: TimelineItem, index: number, array: TimelineItem[]) => string,
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: TimelineItem[] });
