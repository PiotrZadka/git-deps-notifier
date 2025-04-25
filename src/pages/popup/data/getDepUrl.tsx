import axios from "axios";

const cleanRepositoryUrl = (url: string) => {
  if (url?.startsWith("git+")) {
    url = url.replace("git+", "");
  }
  if (url?.endsWith(".git")) {
    url = url.slice(0, -4);
  }
  return url;
};

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
