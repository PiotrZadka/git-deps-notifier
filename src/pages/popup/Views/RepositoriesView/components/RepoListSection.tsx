import { DependenciesPage } from "../../DependenciesView/Dependencies";
import { RepoList } from "./RepoList";

import type { RepoListSectionProps } from "../../../../../types";

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
