import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIssues } from "../../services/issuesApi";
import { GetIssuesThunkArgs } from "../../helpers/models";
import { getRepoInfo } from "../../services/repoInfoApi";

export const getIssuesThunk = createAsyncThunk(
  "issues/getIssues",
  async ({ owner, repoName }: GetIssuesThunkArgs, thunkAPI) => {
    try {
      const data = await getIssues({ owner, repoName });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRepoInfoThunk = createAsyncThunk(
  "repoInfo/getrepoInfo",
  async ({ owner, repoName }: GetIssuesThunkArgs, thunkAPI) => {
    try {
      const data = await getRepoInfo({ owner, repoName });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// =================================================================

// export const getIssuesThunk = createAsyncThunk(
//   "issues/getIssues",
//   async ({ owner, repoName }: GetIssuesThunkArgs) => {
//     try {
//       const response = await fetch(
//         `https://api.github.com/repos/${owner}/${repoName}/issues`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch issues");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error("Failed to fetch issues: " + error.message);
//     }
//   }
// );

// export const getRepoInfoThunk = createAsyncThunk(
//   "repoInfo/getrepoInfo",
//   async ({ owner, repoName }: GetIssuesThunkArgs) => {
//     try {
//       const response = await fetch(
//         `https://api.github.com/repos/${owner}/${repoName}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch issues");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       throw new Error("Failed to fetch issues: " + error.message);
//     }
//   }
// );
