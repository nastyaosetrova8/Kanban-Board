import { GetIssuesThunkArgs } from "../helpers/models";
import { instance } from "./api";

export const getRepoInfo = async ({ owner, repoName }: GetIssuesThunkArgs) => {
  const { data } = await instance.get(`/${owner}/${repoName}`);
  return data;
};
