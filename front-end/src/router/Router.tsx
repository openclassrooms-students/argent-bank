import { Route, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Layout from "../layout/layout";
import Home from "../pages/Index";
import Protected from "./Protected";
import Login from "../pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Protected isAuthenticated>
              <Profile />
            </Protected>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
