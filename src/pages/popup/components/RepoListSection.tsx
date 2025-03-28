import {
	List,
	ListItemText,
	ListItemButton,
	Divider,
	Button,
	Box,
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
							<ListItemText primary={repo} />
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
