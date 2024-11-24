import { create } from "zustand";

type AlertModalStore = {
  openAlertModal: boolean;
  setOpenAlertModal: (openAlertModal: boolean) => void;
};

export const useAlertModalStore = create<AlertModalStore>()((set) => ({
  openAlertModal: false,
  setOpenAlertModal: (openAlertModal: boolean) => {
    set({ openAlertModal });
  },
}));
