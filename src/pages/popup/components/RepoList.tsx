import {
	List,
	ListItemText,
	ListItemButton,
	Divider,
	Button,
	Box,
	Typography,
	Tooltip,
} from "@mui/material";
import type { ExtendedRepoListProps } from "../../../types/RepoListTypes";

export const RepoList = ({
	onRemove,
	repos,
	setSelectedRepo,
}: ExtendedRepoListProps) => {
	return (
		<div>
			<List>
				<ListItemText primary="Your repositories" />
			</List>
			<Divider />
			<List>
				{repos.map((repo) => (
					<Box key={repo} display="flex" alignItems="center" gap={2}>
						<ListItemButton onClick={() => setSelectedRepo(repo)} key={repo}>
							<Tooltip title={repo} arrow>
								<Typography
									sx={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										maxWidth: "270px",
									}}
								>
									<ListItemText primary={repo} />
								</Typography>
							</Tooltip>
						</ListItemButton>
						<Button onClick={() => onRemove(repo)} variant="text">
							Remove
						</Button>
					</Box>
				))}
			</List>
		</div>
	);
};
