import { createSlice } from "@reduxjs/toolkit";
import { getIssuesThunk, getRepoInfoThunk } from "./issuesThunk";

export const initialState = {
  issues: [],
  repoInfo: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getIssuesThunk.fulfilled, (state, { payload }) => {
        state.issues = payload;
      })
      .addCase(getRepoInfoThunk.fulfilled, (state, { payload }) => {
        state.repoInfo = payload;
      }),
});

export const issuesReducer = issuesSlice.reducer;
