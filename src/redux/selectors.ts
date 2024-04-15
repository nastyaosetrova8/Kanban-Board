import { Draft } from "@reduxjs/toolkit";
import { initialRootState } from "./rootSlice";
import { initialState } from "./Issues/issuesSlice";

export const selectIsLoading = (state: Draft<typeof initialRootState>) =>
  state.isLoading;
export const selectError = (state: Draft<typeof initialRootState>) =>
  state.error;

export const selectIssues = (state: Draft<typeof initialState>) =>
  state.issues.issues;
export const selectRepoInfo = (state: Draft<typeof initialState>) =>
  state.issues.repoInfo;
