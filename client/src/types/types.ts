export interface ILoginState {
  isLogin: boolean;
  isInValid: boolean;
  accessToken: string;
}

export interface ILoginPayLoad {
  payload: {
    data: {
      data: { accessToken: string };
      // accessToken: string;
      message: string;
    };
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserState {
  id: number;
  email: string;
  nickname: string;
  userArea: null | string;
  imagePath: null | string;
  myComment: number;
  myPost: number;
  myStorage: number;
  loginType: boolean;
}

export interface IUserPayLoad {
  payload: {
    data: {
      data: {
        id: number;
        email: string;
        nickname: string;
        userArea: null | string;
        imagePath: null | string;
        loginType: boolean;
      };
      myComment: number;
      myPost: number;
      myStorage: number;
    };
  };
}

export interface IMyPage {
  tapName: string;
}

export interface ISearch {
  search: string;
}

export interface IisMine {
  isMine: boolean;
}
