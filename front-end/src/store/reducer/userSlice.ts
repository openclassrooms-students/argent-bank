import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";
import { authFetch } from "../../services/api/user";

export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  user: null | User;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authFetch.login({ email, password });
      return response.body;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const profileUser = createAsyncThunk(
  "user/profile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).user.token;

      if (!token) return rejectWithValue("No token found");

      const response = await authFetch.profile(token);

      return response.body;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  "user/updateProfile",
  async (
    profileUpdateData: {
      firstName: string;
      lastName: string;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as RootState).user.token;

      if (!token) return rejectWithValue("No token found");

      const response = await authFetch.updateProfile(profileUpdateData, token);

      return response.body;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setUserInfo: (state, action: PayloadAction<User>) => {
      console.log("Setting user info:", action);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )

      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(profileUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(profileUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProfileUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.user = action.payload;
        }
      )
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserInfo = (state: RootState) => state.user.user;
