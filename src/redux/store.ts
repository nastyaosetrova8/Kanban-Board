import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import { issuesReducer, repoInfoReducer } from "./Issues/issuesSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    issues: issuesReducer,
    repoInfo: repoInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);
