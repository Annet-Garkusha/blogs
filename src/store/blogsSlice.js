import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (props, { rejectWithValue }) => {
  try {
    const { pageNumber } = props;

    const res = await fetch(`https://blog.kata.academy/api/articles?limit=6&offset=${pageNumber}`);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchArticleOne = createAsyncThunk('articles/fetchArticleOne', async (props, { rejectWithValue }) => {
  try {
    const { title } = props;
    const res = await fetch(`https://blog.kata.academy/api/articles/${title}`);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: {
    articles: [],
    isLoading: false,
    error: false,
    page: null,
    oneArticle: [],
    username: null,
    slug: null,
    title: null,
    description: null,
    body: null,
    tagList: [],
  },
  reducers: {
    addTag(state, action) {
      if (!action.payload.length) {
        return;
      }

      state.tagList.push({
        id: uuidv4(),
        text: action.payload,
      });
    },
    removeTag(state, action) {
      state.tagList = state.tagList.filter((tag) => tag.id !== action.payload);
    },
    clearTag(state) {
      state.tagList = [];
    },
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
      state.username = action.payload.article.author.username;
      state.slug = action.payload.article.slug;
      state.title = action.payload.article.title;
      state.description = action.payload.article.description;
      state.body = action.payload.article.body;
      state.tagList = action.payload.article.tagList.map((tag) => ({
        id: uuidv4(),
        text: tag,
      }));
    },
    [fetchArticle.rejected]: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    [fetchArticleOne.rejected]: (state) => {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const { addTag, removeTag, clearTag } = blogsSlice.actions;

export default blogsSlice.reducer;
