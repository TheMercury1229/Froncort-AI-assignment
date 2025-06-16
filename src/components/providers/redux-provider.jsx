"use client";
import logoStore from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }) => {
  return <Provider store={logoStore}>{children}</Provider>;
};
