import { create } from "zustand"

export type AppStoreType = {
  searchInput: string;
  setSearchInput: (input: string) => void;
};


const useAppStore = create<AppStoreType>((set) => ({
  searchInput: "",
  setSearchInput: (input: string) => set({ searchInput: input }),
}));

export default useAppStore;
