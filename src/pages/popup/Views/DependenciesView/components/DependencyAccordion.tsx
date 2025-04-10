import {
	Divider,
	ListItemButton,
	ListItemText,
	Tooltip,
	Box,
	Typography,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type {
	DependencyListItemProps,
	DependencyAccordionProps,
} from "@src/types";

export const DependencyAccordion = ({
	dependencies,
	label,
	setSelectedDep,
}: DependencyAccordionProps) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span">{label}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{dependencies?.map((dep: DependencyListItemProps) => (
					<Box key={dep.name} display="flex" alignItems="center" gap={2}>
						<ListItemButton onClick={() => setSelectedDep(dep.name)}>
							<Tooltip title={`Current: ${dep.current}`} arrow>
								<ListItemText primary={dep.name} />
							</Tooltip>
						</ListItemButton>
					</Box>
				))}
			</AccordionDetails>
		</Accordion>
	);
};
