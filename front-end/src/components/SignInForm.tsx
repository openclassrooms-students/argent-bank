import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getToken, setToken } from "../utils/token";
import { loginUser } from "../store/reducer/userSlice";

export const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const rememberMe = e.currentTarget.rememberMe.checked;

    const getRememberMe = getToken("rememberMe");
    if (!getRememberMe && rememberMe) {
      setToken(
        "rememberMe",
        JSON.stringify({
          email,
          password,
        })
      );
    }

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      const response = await dispatch(
        loginUser({
          email,
          password,
        })
      );

      if (loginUser.rejected.match(response)) {
        return setError(response.payload as string);
      }

      return navigate("/profile");
    } catch (error) {
      setError(error as string);
      console.error("An error occurred", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="rememberMe" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button">Sign In</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
