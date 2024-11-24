import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { SetStateAction } from "react";

const FilterByMonthYear = ({
  dataValue,
  setDataValue,
  selectOptions,
}: {
  dataValue: string;
  setDataValue: React.Dispatch<SetStateAction<string>>;
  selectOptions: { value: string; label: string }[];
}) => {
  return (
    <div className="mb-10 self-start">
      <Select
        onValueChange={(value) => {
          setDataValue(value);
        }}
        defaultValue={dataValue}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pick a month" />
        </SelectTrigger>

        <SelectContent>
          {selectOptions.map((option) => {
            return (
              <SelectItem key={option.value} value={option.label}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByMonthYear;
