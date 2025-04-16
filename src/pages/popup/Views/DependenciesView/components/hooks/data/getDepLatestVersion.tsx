import axios from "axios";

export const getDepLatestVersion = async ({
	dependencyName,
}: { dependencyName: string }) => {
	try {
		const response = await axios.get(
			`https://registry.npmjs.org/${dependencyName}`,
		);
		const latestVersion = response.data["dist-tags"].latest;
		return { latestVersion };
	} catch (error) {
		console.error(
			`Failed to fetch registry latest version for ${dependencyName}:`,
			error,
		);
		throw error;
	}
};
