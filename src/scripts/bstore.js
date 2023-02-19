import { create } from "zustand";
import { persist } from "zustand/middleware";

const bstore = create(
  persist(
    (set) => ({
      bookmarks: [],
      setBookmarks: (val) => {
        set((state) => ({ bookmarks: val }));
      },
      border: true,
      setBorder: (val) => {
        set((state) => ({ border: val }));
      },
    }),
    {
      name: "bookmarks-storage",
    }
  )
);

export default bstore;
