import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

const FilterCampaign = ({
  archivedState,
  setArchivedState,
}: {
  archivedState: boolean;
  setArchivedState: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span
        className={clsx("font-semibold", {
          "text-slate-400 ": !archivedState,
          "text-blue-500 ": archivedState,
        })}
      >
        include archived campaigns
      </span>
      <Switch
        onClick={() => {
          setArchivedState(!archivedState);
        }}
      />
    </div>
  );
};

export default FilterCampaign;
