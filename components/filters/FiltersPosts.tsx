import React, { SetStateAction } from "react";
import FiltersByStatus from "./FiltersByStatus";
import { useFiltersPostStore } from "@/stores/filtersPost";
import FiltersDate from "./FiltersDate";
import { Calendar } from "lucide-react";
import SearchBarPosts from "../dashboard/campaign/SearchBarPosts";

const FiltersPosts = ({
  setSearchedValue,
  inputValue,
  setInputValue,
}: {
  setSearchedValue: React.Dispatch<SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
}) => {
  const {
    scheduledPublicationDate,
    setScheduledPublicationDate,
    createdAtDate,
    setCreatedAtDate,
  } = useFiltersPostStore();
  return (
    <div className="flex gap-4 items-end justify-center bg-slate-100 rounded-md p-6">
      <SearchBarPosts
        inputValue={inputValue}
        setInputValue={setInputValue}
        setSearchedValue={setSearchedValue}
      />
      <FiltersByStatus />
      <FiltersDate
        date={createdAtDate}
        setDate={setCreatedAtDate}
        label="creation date"
      />
      <FiltersDate
        date={scheduledPublicationDate}
        setDate={setScheduledPublicationDate}
        label="scheduled date"
      />
    </div>
  );
};

export default FiltersPosts;
