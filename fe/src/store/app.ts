import { create } from "zustand"

export type AppStoreType = {
  searchInput: string;
  setSearchInput: (input: string) => void;
};


const useAppStore = create<AppStoreType>((set, get) => ({
  searchInput: "",
  setSearchInput: (input: string) => set({ searchInput: input }),
}));

export default useAppStore;
