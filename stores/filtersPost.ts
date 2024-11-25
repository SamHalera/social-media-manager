import { addDays, getDaysInMonth, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type FiltersPostStore = {
  publicationDate: DateRange | undefined;
  setPublicationDate: (date: DateRange | undefined) => void;
  createdAtDate: DateRange | undefined;
  setCreatedAtDate: (date: DateRange | undefined) => void;
  status: string[];
  setStatus: (method: string[]) => void;
  // showPast: boolean;
  // setShowPast: (showPast: boolean) => void;
  // showUpcoming: boolean;
  // setShowUpcoming: (showUpcoming: boolean) => void;
};

export const useFiltersPostStore = create<FiltersPostStore>()((set) => ({
  publicationDate: {
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
  },
  createdAtDate: {
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
  },
  // showPast: false,
  // showUpcoming: false,
  status: [],
  setStatus: (status: string[]) => {
    set({ status });
  },
  // setShowPast: (showPast: boolean) => {
  //   set({ showPast });
  // },
  // setShowUpcoming: (showUpcoming: boolean) => {
  //   set({ showUpcoming });
  // },
  setPublicationDate: (publicationDate: DateRange | undefined) => {
    set({ publicationDate });
  },
  setCreatedAtDate: (createdAtDate: DateRange | undefined) => {
    set({ createdAtDate });
  },
}));
