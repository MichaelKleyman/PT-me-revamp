import { useAppStore } from ".";

export const updateAppSlice = useAppStore.getState().setAppState;

// SELECTORS
export const useSelectLoggedInUser = () =>
  useAppStore((state) => state.loggedInUser);
export const useSelectPractice = () => useAppStore((state) => state.practice);
