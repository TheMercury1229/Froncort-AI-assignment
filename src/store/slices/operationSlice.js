import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as htmlToImage from "html-to-image";
import { generateLogo } from "@/actions/generate-logo"; // adjust path

const initialState = {
  generatedSVG: null,
  bookmarks: [],
  loading: false,
  error: null,
  generationHistory: [],
};

// Generate logo using Gemini
export const generateSVG = createAsyncThunk(
  "logoOps/generateSVG",
  async (formState, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!formState.companyName?.trim()) {
        throw new Error("Company name is required");
      }
      if (!formState.primaryColor) {
        throw new Error("Primary color is required");
      }
      if (!formState.fontStyle) {
        throw new Error("Font style is required");
      }

      const svg = await generateLogo(formState);

      if (!svg) {
        throw new Error("Failed to generate logo");
      }

      return {
        svg,
        config: formState,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      return rejectWithValue(err.message || "Logo generation failed.");
    }
  }
);

// Download logo as PNG
export const downloadPNG = createAsyncThunk(
  "logoOps/downloadPNG",
  async (nodeId, { rejectWithValue }) => {
    try {
      const node = document.getElementById(nodeId);
      if (!node) {
        throw new Error("Logo element not found");
      }

      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1.0,
        pixelRatio: 2, // For high DPI displays
        backgroundColor: "white",
      });

      const link = document.createElement("a");
      link.download = `logo-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (err) {
      return rejectWithValue("Failed to download logo");
    }
  }
);

// Helper function to safely handle localStorage
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.warn("localStorage not available:", error);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (error) {
      console.warn("localStorage not available:", error);
    }
    return false;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem(key);
        return true;
      }
    } catch (error) {
      console.warn("localStorage not available:", error);
    }
    return false;
  },
};

const logoOpsSlice = createSlice({
  name: "logoOps",
  initialState,
  reducers: {
    bookmarkLogo: (state) => {
      if (state.generatedSVG) {
        const logoData = {
          svg: state.generatedSVG,
          timestamp: new Date().toISOString(),
          id: Date.now().toString(),
        };

        // Check if already bookmarked
        const isAlreadyBookmarked = state.bookmarks.some(
          (bookmark) => bookmark.svg === state.generatedSVG
        );

        if (!isAlreadyBookmarked) {
          state.bookmarks.push(logoData);
          safeLocalStorage.setItem(
            "saved_logos",
            JSON.stringify(state.bookmarks)
          );
        }
      }
    },

    loadBookmarks: (state) => {
      const saved = safeLocalStorage.getItem("saved_logos");
      if (saved) {
        try {
          state.bookmarks = JSON.parse(saved);
        } catch (error) {
          console.error("Error parsing saved logos:", error);
          state.bookmarks = [];
        }
      }
    },

    removeBookmark: (state, action) => {
      const bookmarkId = action.payload;
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== bookmarkId
      );
      safeLocalStorage.setItem("saved_logos", JSON.stringify(state.bookmarks));
    },

    clearBookmarks: (state) => {
      state.bookmarks = [];
      safeLocalStorage.removeItem("saved_logos");
    },

    resetLogo: (state) => {
      state.generatedSVG = null;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    addToHistory: (state, action) => {
      state.generationHistory.unshift(action.payload);
      // Keep only last 10 generations
      if (state.generationHistory.length > 10) {
        state.generationHistory = state.generationHistory.slice(0, 10);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(generateSVG.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSVG.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedSVG = action.payload.svg;
        state.generationHistory.unshift(action.payload);
        // Keep only last 10 generations
        if (state.generationHistory.length > 10) {
          state.generationHistory = state.generationHistory.slice(0, 10);
        }
      })
      .addCase(generateSVG.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.generatedSVG = null;
      })
      .addCase(downloadPNG.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  bookmarkLogo,
  loadBookmarks,
  removeBookmark,
  clearBookmarks,
  resetLogo,
  clearError,
  addToHistory,
} = logoOpsSlice.actions;

export default logoOpsSlice;
