export interface RepoListProps {
	repos: string[];
	onRemove: (repo: string) => void;
}

export interface ExtendedRepoListProps extends RepoListProps {
	setSelectedRepo: React.Dispatch<React.SetStateAction<string | null>>;
}
