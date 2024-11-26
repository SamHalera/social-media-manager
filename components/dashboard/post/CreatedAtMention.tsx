import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import React from "react";

const CreatedAtMention = ({ createdAt }: { createdAt: Date }) => {
  return (
    <div className="text-sm  flex gap-1 items-center">
      <Calendar />
      created at
      <span className="text-blue-500 font-semibold">
        {dayjs(createdAt).format("DD/MM/YYYY")}
      </span>
    </div>
  );
};

export default CreatedAtMention;
