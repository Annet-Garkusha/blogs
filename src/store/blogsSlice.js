import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchArticle = createAsyncThunk(
  "articles/fetchArticle",
  async (props, { rejectWithValue }) => {
    try {
      const { pageNumber } = props;

      const res = await fetch(
        `https://blog.kata.academy/api/articles?limit=6&offset=${pageNumber}`
      );

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchArticleOne = createAsyncThunk(
  "articles/fetchArticleOne",
  async (props, { rejectWithValue }) => {
    try {
      const { title } = props;
      const res = await fetch(
        `https://blog.kata.academy/api/articles/${title}`
      );

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    articles: [],
    isLoading: false,
    error: false,
    page: null,
    oneArticle: [],
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [fetchArticleOne.pending]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.articles = [...action.payload.articles];
      state.isLoading = false;
      state.error = false;
      state.page = action.payload.articlesCount;
    },
    [fetchArticleOne.fulfilled]: (state, action) => {
      state.oneArticle = [{ ...action.payload.article }];
      state.isLoading = false;
      state.error = false;
    },
    [fetchArticle.rejected]: (state) => {
      state.error = true;
    },
    [fetchArticleOne.rejected]: (state) => {
      state.error = true;
    },
  },
});

export default blogsSlice.reducer;
