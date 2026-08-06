import { create } from "zustand";

export type AuthStoreType = {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any | null) => void;
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
