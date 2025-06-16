import { createSlice } from "@reduxjs/toolkit";

const logoSlice = createSlice({
  name: "logo",
  initialState: {
    primaryColor: "#3b82f6",
    fontStyle: "poppins",
    selectedIcon: "star",
    logoShape: "circle",
    layoutType: "icon-above",
    companyName: "",
    description: "",
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      return {
        primaryColor: "#3b82f6",
        fontStyle: "poppins",
        selectedIcon: "star",
        logoShape: "circle",
        layoutType: "icon-above",
        companyName: "",
        description: "",
      };
    },
  },
});

export const { updateField, resetForm } = logoSlice.actions;
export default logoSlice;
