import { Patient, Practice, Practitioner } from "@client/lib/types/auth";
import { create } from "zustand";

interface AppState {
  loggedInUser: Patient | Practitioner | null;
  practice: Practice | null;
}

export const useAppStore = create<
  AppState & {
    setAppState: <K extends keyof AppState>(key: K, value: AppState[K]) => void;
  }
>((set) => ({
  loggedInUser: null,
  practice: null,
  setAppState: (key, value) => set({ [key]: value }),
}));
