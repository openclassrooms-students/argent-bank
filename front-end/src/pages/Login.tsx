import { useEffect } from "react";
import { SignInForm } from "../components/SignInForm";
import { getToken } from "../utils/token";

const Login = () => {
  useEffect(() => {
    const getRememberMe = getToken("rememberMe");

    if (getRememberMe) {
      const { email, password } = JSON.parse(getRememberMe);

      const inputUsername = document.getElementById(
        "username"
      ) as HTMLInputElement;
      inputUsername.value = email;

      const inputPassword = document.getElementById(
        "password"
      ) as HTMLInputElement;
      inputPassword.value = password;

      const inputRememberMe = document.getElementById(
        "rememberMe"
      ) as HTMLInputElement;

      inputRememberMe.checked = true;
    }
  }, []);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <SignInForm />
      </section>
    </main>
  );
};

export default Login;
