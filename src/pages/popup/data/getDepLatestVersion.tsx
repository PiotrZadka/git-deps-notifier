import axios from "axios";

export const getDepLatestVersion = async ({
  dependencyName,
}: {
  dependencyName: string;
}) => {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/${dependencyName}`
    );
    const latest = response.data["dist-tags"].latest;
    return { latest };
  } catch (error) {
    console.error(
      `Failed to fetch registry latest version for ${dependencyName}:`,
      error
    );
    throw error;
  }
};
