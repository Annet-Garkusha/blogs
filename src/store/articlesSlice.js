import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postNewArticle = createAsyncThunk(
  "articles/postNewArticle",
  async (props, { rejectWithValue }) => {
    try {
      console.log(props, "new article");
      const { title, description, body, taglist, token } = props;

      const article = {
        title,
        description,
        body,
        taglist,
      };

      const res = fetch("https://blog.kata.academy/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ article: { ...article } }),
      });
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState: {},
  extraReducers: {
    [postNewArticle.fulfilled]: (state, action) => {
      console.log(action, "action new article");
    },
  },
});

export default articlesSlice.reducer;
