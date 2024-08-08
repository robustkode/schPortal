"use client";
import React, { createContext, useContext, useRef } from "react";

const FocusContext = createContext();

export const useFocus = () => useContext(FocusContext);

export const FocusProvider = ({ children }) => {
  const inputRef = useRef(null);

  return (
    <FocusContext.Provider value={{ inputRef }}>
      {children}
    </FocusContext.Provider>
  );
};
