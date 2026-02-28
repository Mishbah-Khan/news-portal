import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useNewsStore = create()(
  devtools((set) => ({
    news: [],
    setNews: (news) => {
      set({ news});
    },

  }))
);

export default useNewsStore;
