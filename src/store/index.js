import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./blogsSlice";

export default configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});
