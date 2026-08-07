import type { User } from "@/schemas/common";
import { create } from "zustand";

export type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({ user, isAuthenticated: !!user }),

  logout: () =>
    set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
