import axios from "axios";
import { cleanRepositoryUrl } from "@src/utils/utils";

export const getDepUrl = async (name: string) => {
  try {
    const response = await axios.get(`https://registry.npmjs.org/${name}`);

    const latestVersion = response.data["dist-tags"].latest;
    let repositoryUrl = response.data.versions[latestVersion]?.repository?.url;
    repositoryUrl = cleanRepositoryUrl(repositoryUrl);

    return { repositoryUrl };
  } catch (error) {
    console.error(`Failed to fetch git url for ${name}:`, error);
    throw error;
  }
};
