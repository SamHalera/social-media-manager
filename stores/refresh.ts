import { create } from "zustand";

type RefreshStore = {
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
};

export const useRefreshStore = create<RefreshStore>()((set) => ({
  refresh: false,
  setRefresh: (refresh: boolean) => {
    set({ refresh });
  },
}));
