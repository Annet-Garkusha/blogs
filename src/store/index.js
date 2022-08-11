import { configureStore } from '@reduxjs/toolkit';

import blogsReducer from './blogsSlice';
import usersReducer from './usersSlice';
import articlesReducer from './articlesSlice';

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
