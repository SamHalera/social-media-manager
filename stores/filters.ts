import { addDays, getDaysInMonth, startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

type FiltersStore = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  method: string[];
  setMethod: (method: string[]) => void;
  showPast: boolean;
  setShowPast: (showPast: boolean) => void;
  showUpcoming: boolean;
  setShowUpcoming: (showUpcoming: boolean) => void;
};

export const useFiltersStore = create<FiltersStore>()((set) => ({
  date: {
    from: startOfMonth(new Date()),
    to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
  },
  showPast: false,
  showUpcoming: false,
  method: [],
  setMethod: (method: string[]) => {
    set({ method });
  },
  setShowPast: (showPast: boolean) => {
    set({ showPast });
  },
  setShowUpcoming: (showUpcoming: boolean) => {
    set({ showUpcoming });
  },
  setDate: (date: DateRange | undefined) => {
    set({ date });
  },
}));
