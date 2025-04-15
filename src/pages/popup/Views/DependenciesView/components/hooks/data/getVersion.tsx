import axios from "axios";
import type { DependencyListItemProps } from "@src/types";

export const getVersion = async ({
	dependencyName,
}: { dependencyName: string }) => {
	try {
		const response = await axios.get(
			`https://registry.npmjs.org/${dependencyName}`,
		);
		return response.data["dist-tags"].latest;
	} catch (error) {
		console.error(`Failed to fetch version for ${dependencyName}:`, error);
		throw error;
	}
};
