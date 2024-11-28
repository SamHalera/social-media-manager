import React, { SetStateAction, useState } from "react";
import FiltersByStatus from "./FiltersByStatus";
import { useFiltersPostStore } from "@/stores/filtersPost";
import FiltersDate from "./FiltersDate";

import SearchBarPosts from "../dashboard/campaign/SearchBarPosts";
import { usePathname, useSearchParams } from "next/navigation";

const FiltersPosts = ({
  setSearchedValue,
}: {
  setSearchedValue: React.Dispatch<SetStateAction<string>>;
}) => {
  const queryParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(
    queryParams.get("search") ?? ""
  );

  const pathname = usePathname();
  const params = new URLSearchParams(queryParams);

  const {
    scheduledPublicationDate,
    setScheduledPublicationDate,
    createdAtDate,
    setCreatedAtDate,
  } = useFiltersPostStore();

  return (
    <>
      <div className="flex gap-4 items-end justify-center bg-slate-100 rounded-md p-6">
        <SearchBarPosts
          params={params}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSearchedValue={setSearchedValue}
        />
        <FiltersByStatus params={params} />
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
    </>
  );
};

export default FiltersPosts;
