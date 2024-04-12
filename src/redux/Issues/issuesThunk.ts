import { createAsyncThunk } from "@reduxjs/toolkit";

// interface GetIssuesThunkArgs {
//   owner: string;
//   repoName: string;
// }
// ------=========
// export const getIssuesThunk = createAsyncThunk("issues/getIssues", async () => {
//   //   { owner, repoName }: GetIssuesThunkArgs, thunkAPI
//   try {
//     const res = await getDesc;
//     const data = await getIssues(res.map((r) => r.json()));
//     // {
//     //   owner, repoName;
//     // }

//     return data;
//   } catch (error) {
//     console.log(error);
//     //   return thunkAPI.rejectWithValue(error);
//   }
// -------==========

interface GetIssuesThunkArgs {
  owner: string;
  repoName: string;
}

export const getIssuesThunk = createAsyncThunk(
  "issues/getIssues",
  async ({ owner, repoName }: GetIssuesThunkArgs) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/issues`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch issues: " + error.message);
    }
  }
);

export const getRepoInfoThunk = createAsyncThunk(
  "repoInfo/getrepoInfo",
  async ({ owner, repoName }: GetIssuesThunkArgs) => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch issues: " + error.message);
    }
  }
);

// response.data;

// } catch (error: unknown) {
//     if (typeof error === 'object' && error !== null && 'response' in error && 'data' in error.response) {
//         return thunkAPI.rejectWithValue((error as any).response.data);
//     } else {
//         return thunkAPI.rejectWithValue('Unknown error occurred');
//     }
// }

// });
