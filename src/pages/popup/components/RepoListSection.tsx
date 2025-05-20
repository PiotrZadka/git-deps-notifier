import { DependenciesPage } from "../Views/Dependencies";
import { RepoList } from "./RepoList";

import type { RepoListSectionProps } from "@src/types";

export const RepoListSection = ({
  repos,
  onRemove,
  selectedRepo,
  setSelectedRepo,
}: RepoListSectionProps) => {
  return (
    <>
      {selectedRepo ? (
        <DependenciesPage
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
        />
      ) : (
        <RepoList repos={repos} onRemove={onRemove} />
      )}
    </>
  );
};
