import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import { issuesReducer } from "./Issues/issuesSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    issues: issuesReducer,
  },
});

// export const persistor = persistStore(store);
