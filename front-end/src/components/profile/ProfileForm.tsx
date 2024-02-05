import { useState } from "react";
import { User, updateProfileUser } from "../../store/reducer/userSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

export const ProfileForm = ({ user }: { user: User | null }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleToggleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = e.currentTarget.firstName.value;
    const lastName = e.currentTarget.lastName.value;

    if (!firstName || !lastName) {
      setError("Please fill in all fields");
      return;
    }

    const response = dispatch(updateProfileUser({ firstName, lastName }));

    if (updateProfileUser.rejected.match(response)) {
      return setError(response.payload as string);
    }

    handleToggleEdit();
  };

  return editMode && user ? (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="">
        <div className="input-wrapper">
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            id="firstName"
            required
            defaultValue={user?.firstName}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Password</label>
          <input
            type="text"
            id="lastName"
            required
            defaultValue={user?.lastName}
          />
        </div>
      </div>
      <div className="profile-form-buttons">
        <button className="sign-in-button">Save</button>
        <button className="sign-in-button danger" onClick={handleToggleEdit}>
          Cancel
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  ) : (
    <button className="edit-button" onClick={handleToggleEdit}>
      Edit Name
    </button>
  );
};
