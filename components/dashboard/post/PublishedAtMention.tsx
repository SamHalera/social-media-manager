import dayjs from "dayjs";
import { CalendarCheck } from "lucide-react";
import React from "react";

const PublishedAtMention = ({ publishedAt }: { publishedAt: Date | null }) => {
  return (
    <div className="text-sm flex items-center gap-1">
      <CalendarCheck />
      published at
      <span className="italic font-semibold text-blue-400">
        {publishedAt ? dayjs(publishedAt).format("DD/MM/YYYY") : "no schedule"}
      </span>
    </div>
  );
};

export default PublishedAtMention;
