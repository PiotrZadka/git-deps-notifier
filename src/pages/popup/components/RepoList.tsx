// © 2025 Piotr Zadka. Proprietary. Not for redistribution or reuse without permission.

import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";
import type { RepoListProps } from "@src/types";
import { RepoListBase } from "./RepoListBase";
import { repoListText } from "@src/content";

export const RepoList = ({ repos, onRemove }: RepoListProps) => {
  const { setSelectedRepo } = useContext(LandingPageContext);

  return (
    <RepoListBase
      repos={repos}
      onRemove={onRemove}
      onSelect={setSelectedRepo}
      emptyText={repoListText.emptyText}
    />
  );
};
