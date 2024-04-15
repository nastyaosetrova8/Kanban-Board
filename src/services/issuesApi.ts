import { GetIssuesThunkArgs } from "../helpers/models";
import { instance } from "./api";

export const getIssues = async ({ owner, repoName }: GetIssuesThunkArgs) => {
  const { data } = await instance.get(`/${owner}/${repoName}/issues`);
  return data;
};
