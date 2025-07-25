import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};
const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));

export { useLoading };
