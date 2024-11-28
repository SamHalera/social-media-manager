import { Input } from "@/components/ui/input";

import { useFiltersPostStore } from "@/stores/filtersPost";
import { CircleX, Cross, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchBarPosts = ({
  setSearchedValue,
  inputValue,
  setInputValue,
  params,
}: {
  setSearchedValue: React.Dispatch<SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
  params: URLSearchParams;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { query, setQuery } = useFiltersPostStore();
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);

    setSearchedValue(value);
  }, 500);

  return (
    <div className="relative w-1/3">
      {inputValue ? (
        <CircleX
          onClick={() => {
            setInputValue("");
            setSearchedValue("");
            params.delete("search");
            replace(`${pathname}`);
            setQuery(pathname);
          }}
          className="absolute right-2 top-2 text-slate-300 cursor-pointer"
        />
      ) : (
        <Search className="absolute right-2 top-2 text-slate-300" />
      )}

      <div className="">
        <Input
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
            handleSearch(e.currentTarget.value);
          }}
          value={inputValue}
          type="text"
          placeholder="search a post ..."
        />
      </div>
    </div>
  );
};

export default SearchBarPosts;
