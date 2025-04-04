import { useContext } from 'react';
import { LandingPageContext } from '../../../context/langing-page-context';
import { RepoPage } from './RepoPage';
import { RepoList } from './RepoList';

import type { RepoListProps } from '../../../types';

export const RepoListSection = ({ repos, onRemove }: RepoListProps) => {
  const { selectedRepo, setSelectedRepo } = useContext(LandingPageContext);

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
