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

interface RepoListProps {
	repos: string[];
	onRemove: (repo: string) => void;
}

export const RepoList = ({ repos, onRemove }: RepoListProps) => {
	return (
		<div>
			<List>
				<ListItemText primary="Your repositories" />
			</List>
			<Divider />
			<List>
				{repos.map((repo) => (
					<Box key={repo} display="flex" alignItems="center" gap={2}>
						<ListItemButton key={repo}>
							<Tooltip title={repo} arrow>
								<Typography
									sx={{
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										maxWidth: "250px",
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
