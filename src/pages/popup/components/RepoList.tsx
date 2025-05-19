import { useContext } from "react";
import { LandingPageContext } from "@src/context/landing-page-context";
import type { RepoListProps } from "@src/types";
import { RepoListBase } from "./RepoListBase";

export const RepoList = ({ repos, onRemove }: RepoListProps) => {
  const { setSelectedRepo } = useContext(LandingPageContext);

  return (
    <RepoListBase
      repos={repos}
      onRemove={onRemove}
      onSelect={setSelectedRepo}
      emptyText="You haven't added any repositories yet."
      showTooltip={true}
    />
  );
};
