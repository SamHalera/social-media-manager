import { Input } from "@/components/ui/input";
import { CircleX, Cross, Search } from "lucide-react";
import React, { SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchBarTransactions = ({
  setSearchedValue,
  inputValue,
  setInputValue,
}: {
  setSearchedValue: React.Dispatch<SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchedValue(value);
  }, 500);

  return (
    <div className="relative w-1/3">
      {inputValue ? (
        <CircleX
          onClick={() => {
            setInputValue("");
            setSearchedValue("");
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
          placeholder="search a transaction ..."
        />
      </div>
    </div>
  );
};

export default SearchBarTransactions;
