import { RepoPage } from './RepoPage';
import { RepoList } from './RepoList';

import type { RepoListSectionProps } from '../../../types';

export const RepoListSection = ({
  repos,
  onRemove,
  selectedRepo,
  setSelectedRepo,
}: RepoListSectionProps) => {
  return (
    <>
      {selectedRepo ? (
        <RepoPage
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
        />
      ) : (
        <RepoList repos={repos} onRemove={onRemove} />
      )}
    </>
  );
};
