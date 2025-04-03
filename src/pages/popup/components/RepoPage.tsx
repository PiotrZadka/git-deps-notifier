import { Divider, Button, Box, Typography } from "@mui/material";

export const RepoPage = ({
	selectedRepo,
	setSelectedRepo,
}: {
	selectedRepo: string;
	setSelectedRepo: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
	return (
		<div>
			<Box>
				<Typography variant="h6">{selectedRepo}</Typography>
				<Divider />
				<Button
					onClick={() => setSelectedRepo(null)}
					variant="contained"
					sx={{ mb: 2 }}
				>
					Return
				</Button>
			</Box>
		</div>
	);
};
