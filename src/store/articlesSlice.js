import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postNewArticle = createAsyncThunk('articles/postNewArticle', async (props, { rejectWithValue }) => {
  try {
    const { title, description, body, tagList, token } = props;

    const newTagList = tagList.map((tag) => tag.text);

    const article = {
      title,
      description,
      body,
      tagList: newTagList,
    };

    const res = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({ article }),
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (props, { rejectWithValue }) => {
  try {
    const { slug, token } = props;

    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editArticle = createAsyncThunk('articles/EditArticle', async (props, { rejectWithValue }) => {
  try {
    const { title, description, body, tagList, slug, token } = props;
    const newTagList = tagList.map((tag) => tag.text);

    const article = {
      title,
      description,
      body,
      tagList: newTagList,
    };
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({ article }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const likesAticle = createAsyncThunk('articles/likesAticle', async (props, { rejectWithValue }) => {
  try {
    const { slug, token } = props;
    const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});
const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    isLoggin: false,
    favorited: false,
  },

  extraReducers: {
    [postNewArticle.fulfilled]: (state) => {
      state.isLoggin = true;
    },
    [likesAticle.fulfilled]: (state, action) => {
      state.favorited = action.payload.article.favorited;
    },
  },
});

export default articlesSlice.reducer;
