import type { SelectedRepoProps } from "@src/types";
import { useState } from "react";
import { DependencyList } from "./components/DependencyList";
import { Changelog } from "../ChangelogView/Changelog";

export const DependenciesPage = ({
	selectedRepo,
	setSelectedRepo,
}: SelectedRepoProps) => {
	const [selectedDep, setSelectedDep] = useState<string>("");

	return (
		<>
			{selectedDep ? (
				<Changelog selectedDep={selectedDep} setSelectedDep={setSelectedDep} />
			) : (
				<DependencyList
					setSelectedRepo={setSelectedRepo}
					selectedRepo={selectedRepo}
					setSelectedDep={setSelectedDep}
				/>
			)}
		</>
	);
};
