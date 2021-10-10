import { createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.NEXT_PUBLIC_DEV_API_URL;
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openSignIn: true,
    openSignUp: true,
    openProfile: false,
    isLoadingAuth: false,
    myProfile: {
      id: 0,
      nickName: "",
      userProfile: 0,
      created_at: "",
      img: "",
    },
    profiles: [
      {
        id: 0,
        nickName: "",
        userProfile: 0,
        created_at: "",
        img: "",
      },
    ],
  },
  reducers: {
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    resetOpenSignIn(state) {
      state.openSignIn = false;
    },
    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    editNickname(state, action) {
      state.myProfile.nickName = action.payload;
    },
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
} = authSlice.actions;

export default authSlice.reducer;
