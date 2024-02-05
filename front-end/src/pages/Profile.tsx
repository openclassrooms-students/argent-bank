import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../store/reducer/userSlice";
import { AppDispatch, RootState } from "../store";
import { ProfileForm } from "../components/profile/ProfileForm";
import { Accounts } from "../components/profile/Accounts";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { token, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token) dispatch(profileUser());
  }, [token, navigate, dispatch]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}!
        </h1>
        <ProfileForm user={user} />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Accounts />
    </main>
  );
};

export default Profile;
