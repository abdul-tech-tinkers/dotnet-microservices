import { create } from "zustand";

interface UserStore {
  name: string;
  type: string;
  setUser: (name: string, type: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  name: "",
  type: "",
  setUser: (name, type) => set({ name, type }),
}));

export default useUserStore;
