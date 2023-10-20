import { React, useState } from "react";
import { Button, Typography } from "@mui/material";
import { logIn, logOut } from "../../server/Firebase";

function Profile() {
  const initialUser = sessionStorage.getItem("user");
  const [storedUser, setStoredUser] = useState(
    initialUser ? JSON.parse(initialUser) : null
  );

  const storeUserInSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setStoredUser(user);
  };

  const removeUserInSession = () => {
    sessionStorage.removeItem("user");
    setStoredUser(null);
  };

  const handleLogin = () => {
    logIn(storeUserInSession);
  };

  const handleLogout = () => {
    logOut(removeUserInSession);
  };

  return (
    <>
      <h2>Profile</h2>
      {storedUser ? (
        <>
          <Button variant="outlined" onClick={handleLogout}>
            Log out
          </Button>
          <Typography variant="body1">
            Name: {storedUser?.displayName}
          </Typography>
          <Typography variant="body1">Email: {storedUser?.email}</Typography>
        </>
      ) : (
        <Button variant="outlined" onClick={handleLogin}>
          Log in
        </Button>
      )}
    </>
  );
}

export default Profile;
