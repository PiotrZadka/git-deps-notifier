export interface SelectedRepoType {
  selectedRepo: string;
  setSelectedRepo: React.Dispatch<React.SetStateAction<string>>;
}

export interface RepoListProps {
  repos: string[];
  onRemove: (repo: string) => void;
}

export interface AddRepoSectionProps {
  onAdd: (repoUrl: string) => void;
  repos: string[];
}
