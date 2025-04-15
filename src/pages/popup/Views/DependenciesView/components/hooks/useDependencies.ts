import { useState, useEffect } from "react";
import { getDependencies } from "./data/getDependencies";
import { getVersion } from "./data/getVersion";
import type { RepoDependencies } from "@src/types";

export const useDependencies = (selectedRepo: string) => {
	const [fetchedDependencies, setFetchedDependencies] =
		useState<RepoDependencies>({
			dependencies: [],
			devDependencies: [],
		});

	useEffect(() => {
		const fetchDependencies = async () => {
			const fetchedDependencies = await getDependencies(
				selectedRepo,
				"package.json",
			);

			const allDependencies = [
				...fetchedDependencies.dependencies.map((dep) => ({
					...dep,
					type: "dependency",
				})),
				...fetchedDependencies.devDependencies.map((dep) => ({
					...dep,
					type: "devDependency",
				})),
			];

			const dependenciesWithLatest = await Promise.all(
				allDependencies.map(async (dep) => {
					const latest = await getVersion({ dependencyName: dep.name });
					return { ...dep, latest };
				}),
			);

			setFetchedDependencies({
				dependencies: dependenciesWithLatest.filter(
					(dep) => dep.type === "dependency",
				),
				devDependencies: dependenciesWithLatest.filter(
					(dep) => dep.type === "devDependency",
				),
			});
		};
		fetchDependencies();
	}, [selectedRepo]);

	return fetchedDependencies;
};
