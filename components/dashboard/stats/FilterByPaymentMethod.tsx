import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { SetStateAction } from "react";

const FilterByPaymentMethod = ({
  dataByMonth,
  setDataByMonth,
}: {
  dataByMonth: string;
  setDataByMonth: React.Dispatch<SetStateAction<string>>;
}) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div className="mb-10 self-start">
      <Select
        onValueChange={(value) => {
          console.log(value);
          setDataByMonth(value);
        }}
        defaultValue={dataByMonth}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pick a month" />
        </SelectTrigger>

        <SelectContent>
          {monthList.map((month) => {
            return (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByPaymentMethod;
