import { createSlice } from "@reduxjs/toolkit";
import { getIssuesThunk, getRepoInfoThunk } from "./issuesThunk";
import { Issue } from "../../helpers/models";

export interface IssuesState {
  issues: Issue[];
  repoInfo: null;
}

export const initialState: IssuesState = {
  issues: [],
  repoInfo: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getIssuesThunk.fulfilled, (state, action) => {
        state.issues = action.payload;
      })
      .addCase(getRepoInfoThunk.fulfilled, (state, action) => {
        state.repoInfo = action.payload;
      }),
});

export const issuesReducer = issuesSlice.reducer;
export const repoInfoReducer = issuesSlice.reducer;
