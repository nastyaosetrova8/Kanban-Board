// import { createSlice } from "@reduxjs/toolkit";
// import { initialRootState } from "../initialState";

import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialRootState = {
  isLoading: false,
  error: null,
};

export function handlePending(state: Draft<typeof initialRootState>) {
  state.isLoading = true;
  state.error = null;
}

// export function handleRejected(
//   state: Draft<typeof initialRootState>,
//   action: PayloadAction<{ error: null }>
// ) {
//   state.isLoading = false;
//   state.error = action.payload.error;
// }

function handleRejected(state: Draft<typeof initialRootState>, { payload }) {
  state.isLoading = false;
  state.error = payload;
}

export function handleFulfilled(state: Draft<typeof initialRootState>) {
  state.isLoading = false;
}

const rootSlice = createSlice({
  name: "root",
  initialState: initialRootState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher((action) => action.type.endsWith("/rejected"), handleRejected)
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      );
  },
});

export const { setError } = rootSlice.actions;
export const rootReducer = rootSlice.reducer;
