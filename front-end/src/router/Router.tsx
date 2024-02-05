import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Protected from "./Protected";

import Layout from "../layout/layout";
import Home from "../pages/Index";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

const Router = () => {
  const isLoggingIn = useSelector((state: RootState) => !!state.user.token);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Protected redirectTo="/login" isAuthenticated={isLoggingIn}>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="login"
          element={
            <Protected redirectTo="/profile" isAuthenticated={!isLoggingIn}>
              <Login />
            </Protected>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
