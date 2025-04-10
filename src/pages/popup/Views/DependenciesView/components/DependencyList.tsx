import { Divider, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { formatRepoName } from "@src/utils/utils";
import type { DependencyListProps, RepoDependencies } from "@src/types";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useEffect } from "react";
import { getDependencies } from "./getDependencies";
import { DependencyAccordion } from "./DependencyAccordion";

export const DependencyList = ({
	setSelectedRepo,
	setSelectedDep,
	selectedRepo,
}: DependencyListProps) => {
	const extractedRepoName = formatRepoName(selectedRepo);
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
			setFetchedDependencies(fetchedDependencies);
		};
		fetchDependencies();
	}, [selectedRepo]);

	const { dependencies, devDependencies } = fetchedDependencies;

	return (
		<div>
			<Box display="flex" alignItems="center">
				<IconButton
					sx={{ borderRadius: 0 }}
					onClick={() => setSelectedRepo("")}
				>
					<ArrowLeftIcon />
				</IconButton>
				<Typography variant="h6">{extractedRepoName}</Typography>
			</Box>
			<Divider />
			<DependencyAccordion
				dependencies={dependencies}
				label="Dependencies"
				setSelectedDep={setSelectedDep}
			/>
			<DependencyAccordion
				dependencies={devDependencies}
				label="Dev Dependencies"
				setSelectedDep={setSelectedDep}
			/>
		</div>
	);
};
