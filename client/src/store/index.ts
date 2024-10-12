import { create } from "zustand";
import { AppSlice, createAppSlice } from "./slices/app";
import { SetSliceStateFun } from "@/utils/types/util";
import { createJSONStorage, persist } from "zustand/middleware";

const storageKey = "revamp-store";

export type RevampStore = AppSlice & {
  setState: SetSliceStateFun<RevampStore>;
};

export const useRevampStore = create<RevampStore>()(
  persist(
    (...args) => ({
      ...createAppSlice(...args),
      setState: (update: Partial<RevampStore>) => {
        const [set] = args;
        set((state) => ({
          ...state,
          ...update,
        }));
      },
    }),
    {
      name: storageKey, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
