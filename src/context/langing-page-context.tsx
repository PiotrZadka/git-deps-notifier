import React from 'react';

export const LandingPageContext = React.createContext<{
  selectedRepo: string;
  setSelectedRepo: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedRepo: '',
  setSelectedRepo: () => {},
});
