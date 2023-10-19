import { React, useState } from "react";
import { Button } from "@mui/material";
import { logIn, logOut } from "../../server/Firebase";

function Profile() {
  const [storedUser, setStoredUser] = useState(sessionStorage.getItem("user"));

  const storeUserInSession = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setStoredUser(JSON.stringify(user));
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
        <Button variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleLogin}>
          Log in
        </Button>
      )}
    </>
  );
}

export default Profile;
