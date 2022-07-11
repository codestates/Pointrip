import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/Login";
import SignUpPage from "../pages/SignUp/SignUp";
import MainPage from "../pages/Main/Main";
import ShowAllPage from "../pages/ShowAll/ShowAll";
import MyPage from "../pages/MyPage/MyPage";
import CreatePostPage from "../pages/CreatPost/CreatePost/CreatePost";
import EditPost from "../pages/CreatPost/EditPost/EditPost";
import PrivateRoute from "./PrivateRoute";
import DetailPost from "../pages/CreatPost/DetailPost/DetailPost";

// Error 페이지 정의
import Error404 from "pages/common/error/Error404";

// Layout 페이지 정의
import DefaultLayout from "layouts";
import DefaultSignLayout from "layouts/DefaultSignLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
        <Route element={<DefaultLayout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/detail" element={<DetailPost />} />
        <Route path="/showAllPage" element={<ShowAllPage />} />

        {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={false} />}>
          {/* DefaultSignLayout 가 아니라 탭으로 묶고 싶지만, 전역 네비게이션 설정 상, 따로 두는 것이 맞겠다 싶음. */}
          <Route element={<DefaultSignLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
          </Route>
          {/* 로그인 안해도 들어가게 잠시 열어둠. */}
        </Route>

        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/createPostPage" element={<CreatePostPage />} />
          <Route path="/editpost" element={<EditPost />} />
          {/* 전역적으로 관리될 필요까지는 없어서 tab으로 mypage를 나눔. */}
        </Route>

        {/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
