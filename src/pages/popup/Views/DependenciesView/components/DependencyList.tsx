import {
	Divider,
	ListItemButton,
	ListItemText,
	Tooltip,
	Box,
	Typography,
	IconButton,
} from "@mui/material";
import { useState } from "react";
import { formatRepoName } from "@src/utils/utils";
// import { renderDependencyIcon } from "../../../../../utils/utils";
import type {
	DependencyListProps,
	fetchedDependencies,
	DependencyListItemProps,
} from "@src/types";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useEffect } from "react";
import { getDependencies } from "./getDependencies";

export const DependencyList = ({
	setSelectedRepo,
	setSelectedDep,
	selectedRepo,
}: DependencyListProps) => {
	const extratedRepoName = formatRepoName(selectedRepo);
	const [fetchedDependencies, setFetchedDependencies] =
		useState<fetchedDependencies>({
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
				<Typography variant="h6">{extratedRepoName}</Typography>
			</Box>

			<Divider />
			<Typography variant="subtitle1" sx={{ mt: 2 }}>
				Prod Dependencies
			</Typography>
			{dependencies?.map((dep: DependencyListItemProps) => (
				<Box key={dep.name} display="flex" alignItems="center" gap={2}>
					<ListItemButton onClick={() => setSelectedDep(dep.name)}>
						<Tooltip title={`Current: ${dep.current}`} arrow>
							<ListItemText primary={dep.name} />
						</Tooltip>
					</ListItemButton>
				</Box>
			))}

			<Divider />
			<Typography variant="subtitle1" sx={{ mt: 2 }}>
				Dev Dependencies
			</Typography>
			{devDependencies?.map((dep: DependencyListItemProps) => (
				<Box key={dep.name} display="flex" alignItems="center" gap={2}>
					<ListItemButton onClick={() => setSelectedDep(dep.name)}>
						<Tooltip title={`Current: ${dep.current}`} arrow>
							<ListItemText primary={dep.name} />
						</Tooltip>
					</ListItemButton>
				</Box>
			))}
		</div>
	);
};
