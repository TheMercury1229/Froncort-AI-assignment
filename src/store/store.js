import { configureStore } from "@reduxjs/toolkit";
import logoSlice from "@/store/slices/logoSlice";
import logoOpsSlice from "@/store/slices/operationSlice";

const logoStore = configureStore({
  reducer: {
    logo: logoSlice.reducer,
    logoOps: logoOpsSlice.reducer,
  },
});

export default logoStore;
