import { useFiltersPostStore } from "@/stores/filtersPost";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FiltersByStatus = () => {
  const [dropped, setDropped] = useState<boolean>(false);
  const { status, setStatus } = useFiltersPostStore();
  const postStatus = ["DRAFT", "PUBLISHED", "PENDING"];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropped(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [dropped]);
  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          setDropped(!dropped);
        }}
        className={clsx(
          "flex justify-between gap-3 items-center border border-slate-200 px-4 py-1 rounded-sm cursor-pointer w-36 h-[40px]",
          {
            "bg-blue-200 shadow-md": status.length > 0,
            "bg-white": status.length < 1,
          }
        )}
      >
        <span
          className={clsx(
            "text-xs bg-blue-600 text-white justify-center items-center p-1 rounded-full h-5 w-5",
            {
              flex: status.length > 0,
              hidden: status.length < 1,
            }
          )}
        >
          {status.length < 1 ? "" : status.length}
        </span>
        <span className="text-sm text-slate-700">Status</span>
        {dropped ? (
          <ChevronUp className="text-slate-700" size={15} />
        ) : (
          <ChevronDown className="text-slate-700" size={15} />
        )}
      </div>
      <div
        className={clsx(
          " flex-col gap-1 bg-blue-100 border border-slate-200 p-3 rounded-sm shadow-lg absolute top-10 w-60 z-10 opacity-0 duration-500",
          {
            "flex opacity-100 top-11": dropped,
            "hidden opacity-0 top-14": !dropped,
          }
        )}
      >
        {postStatus.map((eltStatus) => {
          return (
            <div key={eltStatus} className="form-control">
              <label className="flex gap-3 items-center cursor-pointer">
                <input
                  onChange={(e) => {
                    const checkedValue = e.currentTarget.value;

                    if (status.includes(checkedValue)) {
                      const index = status.indexOf(checkedValue);
                      status.splice(index, 1);
                      setStatus(status);
                    } else {
                      setStatus([...status, checkedValue]);
                    }
                  }}
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  value={eltStatus}
                  defaultChecked={status.includes(eltStatus)}
                />
                <span className="label-text">{eltStatus}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersByStatus;
