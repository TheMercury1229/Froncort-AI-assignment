import { configureStore } from "@reduxjs/toolkit";
import logoSlice from "@/store/slices/logoSlice";

const logoStore = configureStore({
  reducer: {
    logo: logoSlice.reducer,
  },
});

export default logoStore;
