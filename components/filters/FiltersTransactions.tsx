"use client";

import React from "react";
import FiltersDate from "./FiltersDate";
import FiltersStatus from "./FiltersStatus";
import FiltersPeymentMethod from "./FiltersPeymentMethod";

const FiltersTransactions = () => {
  return (
    <div className="flex flex-col items-center gap-4  ">
      <div className="flex gap-3">
        <FiltersDate />
        <FiltersStatus />
        <FiltersPeymentMethod />
      </div>
    </div>
  );
};

export default FiltersTransactions;
