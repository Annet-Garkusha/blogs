import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import usersReducer from "./usersSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
