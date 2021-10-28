export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

// authSlice.ts

export interface AUTH_SLICE_PROFILE {
  id: number;
  nickName: string;
  userProfile: number;
  created_on: string;
  img: string;
}
export interface AUTH_SLICE_STATE {
  isOpenAuthModal: boolean;
  authMode: "login" | "register";
  openProfile: boolean;
  isLoadingAuth: boolean;
  myprofile: AUTH_SLICE_PROFILE;
  profiles: AUTH_SLICE_PROFILE[];
}
export interface PROPS_AUTHEN {
  email: string;
  password: string;
}
export interface PROPS_PROFILE {
  id: number;
  nickName: string;
  img: File | null;
}

export interface PROPS_NICKNAME {
  nickName: string;
}

//postSlice.ts

export interface POST_SLICE_STATE {
  isLoadingPost: boolean;
  openNewPost: boolean;
}

export interface PROPS_NEWPOST {
  title: string;
  img: File | null;
}

export interface PROPS_LIKED {
  id: number;
  title: string;
  current: number[];
  new: number;
}

export interface POST_COMMENT {
  text: string;
  post: number;
}

export interface PROPS_POST {
  id: number;
  userPost: number;
  title: string;
  img: string;
  liked: number[];
  created_on: string;
}

export interface PROPS_POST_ID {
  postId: number;
}
