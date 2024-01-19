import { SignInForm } from "../components/SignInForm";

const Login = () => {
  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        <SignInForm />
      </section>
    </div>
  );
};

export default Login;
