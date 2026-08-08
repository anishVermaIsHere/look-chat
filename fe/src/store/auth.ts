import type { User } from "@/schemas/common"
import { create } from "zustand"
import { getSelf } from "@/services/apis/auth"

export type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean,
  setUser: (user: User | null) => void;
  logout: () => void;
  init: () => Promise<void>
};


const useAuthStore = create<AuthStoreType>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: user?.id ? true : false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  init: async () => {
    if (get().isInitialized) return;

    set({ isInitialized: true });
    try {
      const response = await getSelf();
      const user = response?.data?.user;
      set({
        user: { ...user, firstName: user.first_name, lastName: user.last_name, fullName: user.full_name },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Auth initialization failed:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: false
      });
    }
  },
}));

export default useAuthStore;
