import dayjs from "dayjs";
import { CalendarClock } from "lucide-react";
import React from "react";

const ScheduledAtMention = ({
  publicationDate,
}: {
  publicationDate: Date | null;
}) => {
  return (
    <div className="text-sm flex items-center gap-1">
      <CalendarClock />
      scheduled on
      <span className="italic font-semibold text-blue-400">
        {publicationDate
          ? dayjs(publicationDate).format("DD/MM/YYYY")
          : "no schedule"}
      </span>
    </div>
  );
};

export default ScheduledAtMention;
