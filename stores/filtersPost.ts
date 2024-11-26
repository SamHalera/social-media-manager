import { addDays, getDaysInMonth, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type FiltersPostStore = {
  scheduledPublicationDate: DateRange | undefined;
  setScheduledPublicationDate: (date: DateRange | undefined) => void;
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
  scheduledPublicationDate: {
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
  },
  createdAtDate: {
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
  },

  status: [],
  setStatus: (status: string[]) => {
    set({ status });
  },

  setScheduledPublicationDate: (
    scheduledPublicationDate: DateRange | undefined
  ) => {
    set({ scheduledPublicationDate });
  },
  setCreatedAtDate: (createdAtDate: DateRange | undefined) => {
    set({ createdAtDate });
  },
}));
