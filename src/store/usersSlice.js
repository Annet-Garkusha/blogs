import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import avatar from '../components/Article-item/avatar.svg';

export const usersAutorization = createAsyncThunk('users/usersAutorization', async (props, { rejectWithValue }) => {
  try {
    const { username, email, password } = props;

    const user = {
      username,
      email,
      password,
    };

    const res = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...user } }),
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async (token, { rejectWithValue }) => {
  try {
    const res = await fetch('https://blog.kata.academy/api/user', {
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

export const usersEdit = createAsyncThunk('users/usersEdit', async (props, { rejectWithValue }) => {
  try {
    const { email, username, image, password, token } = props;

    const user = {
      email,
      token,
      username,
      image,
      password,
    };

    const res = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({ user: { ...user } }),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const usersProfile = createAsyncThunk('users/usersProfile', async (props, { rejectWithValue }) => {
  try {
    const { email, password } = props;
    const user = {
      email,
      password,
    };

    const res = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...user } }),
    });

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    localStorage.setItem('isLoggin', true);
    return await res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    username: null,
    email: null,
    password: null,
    token: false,
    isLoggin: false,
    image: null,
    errorMessage: null,
  },
  reducers: {
    setUserLogout(state) {
      state.isLoggin = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [usersAutorization.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.token = localStorage.setItem('token', action.payload.user.token);
      state.isLoggin = true;
      state.image = avatar;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.username = action.payload.user.username;
      state.image = action.payload.user.image;
      state.isLoggin = true;
    },
    [usersEdit.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
    },
    [usersProfile.fulfilled]: (state, action) => {
      state.username = action.payload.user.username;
      state.isLoggin = true;
      state.email = action.payload.user.email;
      state.password = action.payload.user.password;
      state.token = localStorage.setItem('token', action.payload.user.token);
    },
    [usersProfile.rejected]: (state) => {
      state.errorMessage = 'Email or password: "is invalid"';
    },
  },
});

export const { setUserLogout } = usersSlice.actions;

export default usersSlice.reducer;
