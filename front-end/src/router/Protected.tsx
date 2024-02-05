import { Navigate } from "react-router-dom";

const Protected = ({
  isAuthenticated,
  redirectTo,
  children,
}: {
  isAuthenticated: boolean | undefined;
  redirectTo: string;
  children: React.ReactNode;
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
export default Protected;
