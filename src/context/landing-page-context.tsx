// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import React from "react";

export const LandingPageContext = React.createContext<{
  selectedRepo: string;
  setSelectedRepo: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedRepo: "",
  setSelectedRepo: () => {},
});
