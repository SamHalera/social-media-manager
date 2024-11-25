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
    publicationDate,
    setPublicationDate,
    createdAtDate,
    setCreatedAtDate,
  } = useFiltersPostStore();
  return (
    <div className="flex gap-4 items-end justify-center bg-slate-100 rounded-md p-6">
      {/* <div className="flex gap-3 items-center w-full justify-center">
        
      </div> */}

      {/* <div className="flex gap-3 items-center  justify-centerw-full"> */}
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
        date={publicationDate}
        setDate={setPublicationDate}
        label="publication date"
      />

      {/* <FiltersDate />
      <FiltersStatus />
      <FiltersPeymentMethod /> */}
      {/* </div> */}
    </div>
  );
};

export default FiltersPosts;
