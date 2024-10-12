import { StateCreator } from "zustand";
import { SetSliceStateFun } from "@/utils/types/util";

export type AppSlice = {
  app: {
    userLoggedIn: boolean;
    setAppState: SetSliceStateFun<AppSlice["app"]>;
  };
};

const initialAppSlice: Omit<AppSlice["app"], "setAppState"> = {
  userLoggedIn: false,
};

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  app: {
    ...initialAppSlice,
    setAppState: (update) =>
      set((state) => ({
        app: {
          ...state.app,
          ...(typeof update === "object" ? update : update(state.app)),
        },
      })),
  },
});

// Selectors
export const setAppState = (state: AppSlice) => state.app.setAppState;
export const selectUserLoggedIn = (state: AppSlice) => state.app.userLoggedIn;
