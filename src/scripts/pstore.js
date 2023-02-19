import { create } from "zustand";
import { persist } from "zustand/middleware";

const pstore = create(
  persist(
    (set) => ({
      scrolls: [],
      setScrolls: (val) => {
        set((state) => ({ scrolls: val }));
      },
      cultures: [],
      setCultures: (val) => {
        set((state) => ({ cultures: val }));
      },
      techs: [],
      setTechs: (val) => {
        set((state) => ({ techs: val }));
      },
      guardians: [],
      setGuardians: (val) => {
        set((state) => ({ guardians: val }));
      },
      order: true,
      setOrder: (val) => {
        set((state) => ({ order: val }));
      },
    }),
    {
      name: "guardians-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default pstore;
