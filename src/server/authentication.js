import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// https://firebase.google.com/docs/web/learn-more#libraries-cdn

import { auth, provider } from "./firebaseInit";

const logIn = (successCallback) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      successCallback(user);
    })
    .catch((error) => {
      // TODO: make UI display error here
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(
        "error with signing in",
        errorCode,
        errorMessage,
        email,
        credential
      );
    });
};

const logOut = (successCallback) => {
  signOut(auth)
    .then(() => {
      successCallback();
    })
    .catch((error) => {
      // TODO: make UI display error here
      console.log("sign out error", error);
    });
};

export { logIn, logOut };
