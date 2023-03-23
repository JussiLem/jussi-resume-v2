import { FC, memo } from 'react';

import { TimelineItem } from '../../../data/dataDef';

const TimelineItem: FC<{ item: TimelineItem }> = memo(({ item }) => {
  const { title, date, location, content, endDate } = item;
  return (
    <div className="flex flex-col pb-8 text-center last:pb-0 md:text-left">
      {location ? (
        <div className="flex flex-col pb-4">
          <h2 className="text-xl font-bold">{location}</h2>
          <div className="flex items-center justify-center gap-x-2 md:justify-start">
            <span className="flex-1 text-sm font-medium italic sm:flex-none">{title}</span>
            <span>•</span>
            <span className="flex-1 text-sm sm:flex-none">
              {date} {endDate ? `- ${endDate}` : null}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex items-center justify-center gap-x-2 md:justify-start">
            <span className="flex-1 text-sm sm:flex-none">
              {date} {endDate ? `- ${endDate}` : null}
            </span>
          </div>
        </div>
      )}
      {content}
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
