import { Navigate } from "react-router-dom";

const Protected = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean | undefined;
  children: React.ReactNode;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default Protected;
