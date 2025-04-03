import { useState } from "react";
import { RepoPage } from "./RepoPage";
import { RepoList } from "./RepoList";

import type { RepoListProps } from "../../../types/RepoListTypes";

export const RepoListSection = ({ repos, onRemove }: RepoListProps) => {
	const [selectedRepo, setSelectedRepo] = useState<string | null>(null);

	return (
		<>
			{selectedRepo ? (
				<RepoPage
					selectedRepo={selectedRepo}
					setSelectedRepo={setSelectedRepo}
				/>
			) : (
				<RepoList
					onRemove={onRemove}
					repos={repos}
					setSelectedRepo={setSelectedRepo}
				/>
			)}
		</>
	);
};
