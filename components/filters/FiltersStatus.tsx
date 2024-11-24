import { useFiltersStore } from "@/stores/filters";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FiltersStatus = () => {
  const { showPast, showUpcoming, setShowPast, setShowUpcoming } =
    useFiltersStore();
  const [dropped, setDropped] = useState<boolean>(false);

  const computeTrueValues = (values: boolean[]) => {
    return values.filter((value) => value === true).length;
  };

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
            "bg-blue-200 shadow-md": showPast || showUpcoming,
            "bg-white ": !showPast && !showUpcoming,
          }
        )}
      >
        <span
          className={clsx(
            "text-xs bg-blue-600 text-white justify-center items-center p-1 rounded-full h-5 w-5",
            {
              flex: computeTrueValues([showPast, showUpcoming]) > 0,
              hidden: computeTrueValues([showPast, showUpcoming]) < 1,
            }
          )}
        >
          {computeTrueValues([showPast, showUpcoming]) < 1
            ? ""
            : computeTrueValues([showPast, showUpcoming])}
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
          " flex-col gap-1 bg-blue-100 border border-slate-200 p-3 rounded-sm shadow-lg absolute w-[150px] z-10 duration-500",
          {
            "flex opacity-100 top-11": dropped,
            "hidden opacity-0 top-14": !dropped,
          }
        )}
      >
        <div className="form-control">
          <label className="flex gap-3 items-center cursor-pointer">
            <input
              onChange={() => {
                setShowPast(!showPast);
              }}
              type="checkbox"
              defaultChecked={showPast}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="label-text">Past</span>
          </label>
        </div>
        <div className="form-control">
          <label className="flex gap-3 items-center cursor-pointer">
            <input
              onChange={() => {
                setShowUpcoming(!showUpcoming);
              }}
              type="checkbox"
              defaultChecked={showUpcoming}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="label-text">Upcoming</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltersStatus;
