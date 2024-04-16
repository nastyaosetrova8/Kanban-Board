import { RootState } from "./store";

export const selectIsLoading = (state: RootState) => state.root.isLoading;
export const selectError = (state: RootState) => state.root.error;
export const selectIssues = (state: RootState) => state.issues.issues;
export const selectRepoInfo = (state: RootState) => state.issues.repoInfo;
