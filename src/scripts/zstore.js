import { create } from "zustand";
const zstore = create(
  (set) => ({
    term: "",
    setTerm: (val) => {
      set((state) => ({ term: val }));
    },
    searches: [],
    setSearches: (val) => {
      set((state) => ({ searches: val }));
    },
    mobile: false,
    setMobile: (val) => {
      set((state) => ({ mobile: val }));
    },
    spinner: false,
    setSpinner: (val) => {
      set((state) => ({ spinner: val }));
    },
  }),
  {
    name: "guardians-storage",
    getStorage: () => sessionStorage,
  }
);

export default zstore;
