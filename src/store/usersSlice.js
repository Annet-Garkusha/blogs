import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const usersAutorization = createAsyncThunk(
  "users/usersAutorization",
  async (props, { rejectWithValue }) => {
    try {
      console.log(props, "props");
      const { username, email, password } = props;

      const user = {
        username,
        email,
        password,
      };
      console.log(user, "user");
      const res = await fetch("https://blog.kata.academy/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    username: null,
    email: null,
    password: null,
    token: null,
  },
  extraReducers: {
    [usersAutorization.fulfilled]: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      console.log(action.payload.username, "name");
    },
  },
});

export default usersSlice.reducer;
