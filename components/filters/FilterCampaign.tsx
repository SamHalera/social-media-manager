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
      <span className="text-slate-400 font-semibold">archived</span>
      <Switch
        onClick={() => {
          setArchivedState(!archivedState);
        }}
      />
    </div>
  );
};

export default FilterCampaign;
