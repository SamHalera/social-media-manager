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
  query: string;
  setQuery: (query: string) => void;
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
  query: "",
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
  setQuery: (query: string) => {
    set({ query });
  },
}));
