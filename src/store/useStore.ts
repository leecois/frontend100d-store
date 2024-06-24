import axiosClient from "@/api/axiosClient";
import { create } from "zustand";

interface Brand {
  _id: string;
  brandName: string;
  watchCount: number;
}

interface Comment {
  _id: string;
  rating: number;
  content: string;
  author: {
    _id: string;
    membername: string;
  };
  createdAt: string;
}

interface Watch {
  _id: string;
  watchName: string;
  image: string;
  price: number;
  automatic: boolean;
  watchDescription: string;
  brand: Brand | null;
  comments: Comment[];
}

interface StoreState {
  brands: Brand[];
  watches: Watch[];
  selectedBrand: string | null;
  query: string;
  sort: string;
  order: "asc" | "desc";
  start: number;
  end: number;
  setBrands: () => void;
  setWatches: () => void;
  fetchWatchDetails: (watchId: string) => void;
  selectBrand: (brandId: string | null) => void;
  setQuery: (query: string) => void;
  setSort: (sort: string) => void;
  setOrder: (order: "asc" | "desc") => void;
  setRange: (start: number, end: number) => void;
  addComment: (
    watchId: string,
    rating: number,
    content: string,
    author: { _id: string; membername: string }
  ) => void;
  updateComment: (
    watchId: string,
    commentId: string,
    content: string,
    rating: number
  ) => void;
  deleteComment: (watchId: string, commentId: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  brands: [],
  watches: [],
  selectedBrand: null,
  query: "",
  sort: "price",
  order: "asc",
  start: 0,
  end: 10,
  setBrands: async () => {
    try {
      const response = await axiosClient.get("/brands");
      const brandsWithCounts = await Promise.all(
        response.data.map(async (brand: Brand) => {
          const watchesResponse = await axiosClient.get(
            `/watches?brand=${brand._id}`
          );
          return { ...brand, watchCount: watchesResponse.data.length };
        })
      );
      set({ brands: brandsWithCounts });
    } catch (error) {
      console.error("Failed to fetch brands", error);
    }
  },
  setWatches: async () => {
    const { query, sort, order, start, end, selectedBrand } = get();
    try {
      const response = await axiosClient.get("/watches", {
        params: {
          watchName_like: query,
          brand: selectedBrand,
          _start: start,
          _end: end,
          _sort: sort,
          _order: order,
        },
      });
      set({ watches: response.data });
    } catch (error) {
      console.error("Failed to fetch watches", error);
    }
  },
  fetchWatchDetails: async (watchId) => {
    try {
      const response = await axiosClient.get(`/watches/${watchId}`);
      set((state) => ({
        watches: state.watches.map((watch) =>
          watch._id === watchId ? response.data : watch
        ),
      }));
    } catch (error) {
      console.error("Failed to fetch watch details", error);
    }
  },
  selectBrand: (brandId: string | null) => {
    set({ selectedBrand: brandId });
    get().setWatches();
  },
  setQuery: (query: string) => {
    set({ query });
    get().setWatches();
  },
  setSort: (sort: string) => {
    set({ sort });
    get().setWatches();
  },
  setOrder: (order: "asc" | "desc") => {
    set({ order });
    get().setWatches();
  },
  setRange: (start: number, end: number) => {
    set({ start, end });
    get().setWatches();
  },
  addComment: async (watchId, rating, content) => {
    try {
      await axiosClient.post(`/watches/${watchId}/comments`, {
        rating,
        content,
      });
      get().fetchWatchDetails(watchId);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  },
  updateComment: async (watchId, commentId, content, rating) => {
    try {
      await axiosClient.patch(`/watches/${watchId}/comments/${commentId}`, {
        content,
        rating,
      });
      get().fetchWatchDetails(watchId);
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  },
  deleteComment: async (watchId, commentId) => {
    try {
      await axiosClient.delete(`/watches/${watchId}/comments/${commentId}`);
      get().fetchWatchDetails(watchId); // Fetch updated watch details
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  },
}));
