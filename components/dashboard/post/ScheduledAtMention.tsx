import dayjs from "dayjs";
import { CalendarClock } from "lucide-react";
import React from "react";

const ScheduledAtMention = ({
  scheduledPublicationDate,
}: {
  scheduledPublicationDate: Date | null;
}) => {
  return (
    <div className="text-xs flex items-center gap-1">
      <CalendarClock />
      scheduled on
      <span className="italic font-semibold text-blue-400">
        {scheduledPublicationDate
          ? dayjs(scheduledPublicationDate).format("DD/MM/YYYY")
          : "no schedule"}
      </span>
    </div>
  );
};

export default ScheduledAtMention;
