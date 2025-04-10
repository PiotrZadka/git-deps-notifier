export interface SelectedRepoProps {
	selectedRepo: string;
	setSelectedRepo: React.Dispatch<React.SetStateAction<string>>;
}

export interface RepoListProps {
	repos: string[];
	onRemove: (repo: string) => void;
}

export interface RepoListSectionProps
	extends RepoListProps,
		SelectedRepoProps {}

export interface AddRepoSectionProps {
	onAdd: (repoUrl: string) => void;
	repos: string[];
}

export interface ChangeLogProps {
	selectedDep: string;
	setSelectedDep: React.Dispatch<React.SetStateAction<string>>;
}

export interface DependencyListProps extends SelectedRepoProps {
	setSelectedDep: React.Dispatch<React.SetStateAction<string>>;
}

export interface fetchedDependencies {
	dependencies: { name: string; current: string }[];
	devDependencies: { name: string; current: string }[];
}

export interface DependencyListItemProps {
	name: string;
	current: string;
}
