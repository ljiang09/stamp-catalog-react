import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  get,
  getDatabase,
  ref as ref_database,
  set,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {
  getDownloadURL,
  getStorage,
  ref as ref_storage,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// https://firebase.google.com/docs/web/learn-more#libraries-cdn

import { stampInfo } from "../components/catalog/StampData";
import firebaseConfig from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getDatabase();

console.log("firebase initialized");

// used for beginning testing to generate some basic data
const initialPost = () => {
  const jsonData = JSON.stringify(stampInfo);

  set(ref_database(db, "stampInfo"), JSON.parse(jsonData))
    .then(function () {
      window.alert("Uploaded!");
    })
    .catch(function (error) {
      console.log("Synchronization failed", error);
    });
};

const retrieveCatalog = (setAllStamps) => {
  // TODO: load sets, then singles

  get(ref_database(db, "stampInfo/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setAllStamps(snapshot.val());
        console.log("Catalog retrieved");
      } else {
        console.log("No data available at location `stampInfo/`");
      }
    })
    .catch((error) => {
      console.error("error with loading stamp info", error);
    });
};

const retrieveTags = (callback) => {
  get(ref_database(db, "tags/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      } else {
        console.log("No tags available");
        callback([]);
      }
    })
    .catch((error) => {
      console.error("error with loading tags info", error);
      callback([]);
    });
};

const { v4: uuidv4 } = require("uuid");

// TODO: add better error handling on the UI side
const uploadSingle = (stampInfo, successCallback) => {
  const uuid = uuidv4();

  uploadBytesResumable(
    ref_storage(storage, "images/singles/" + uuid),
    // ref_storage(storage, "images/singles/tester/" + uuid),
    stampInfo.imgFile
  ).then((snapshot) => {
    getDownloadURL(snapshot.ref)
      .then((url) => {
        uploadSingleToDatabase(uuid, stampInfo, successCallback, url);
      })
      .catch((error) => {
        console.error("Upload to Storage failed", error);
      });
  });
};

const uploadSingleToDatabase = (uuid, stampInfo, successCallback, fileLink) => {
  set(ref_database(db, "stampInfo/singles/" + uuid), {
    // set(ref_database(db, "stampInfo/tester/singles/" + uuid), {
    name: stampInfo.name,
    value: stampInfo.value,
    date: stampInfo.date,
    description: stampInfo.description,
    image: fileLink,
    owned: stampInfo.owned,
    tags: stampInfo.tags,
  })
    .then(function () {
      if (stampInfo.customTags.length > 0) {
        // update the custom tags to the tags database
        get(ref_database(db, "tags/"))
          .then((snapshot) => {
            const currTags = snapshot.val() || [];
            const updatedTags = [...currTags, ...stampInfo.customTags];

            set(ref_database(db, "tags/"), updatedTags)
              .then(function () {
                window.alert("Uploaded with custom tags!");
                successCallback();
              })
              .catch(function (error) {
                console.error("error with updating tags", error);
              });
          })
          .catch((error) => {
            console.error("error with getting tags from database", error);
          });
      } else {
        window.alert("Uploaded!");
        successCallback();
      }
    })
    .catch(function (error) {
      console.error("Synchronization failed", error);
    });
};

const uploadSet = (stampsInfo, successCallback) => {
  Promise.all(
    stampsInfo.inputSets.map((stampInfo) => {
      const uuid = uuidv4();

      return uploadBytesResumable(
        // ref_storage(storage, "images/sets/" + uuid),
        ref_storage(storage, "images/sets/tester/" + uuid),
        stampInfo.imgFile
      ).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            uploadSetToDatabase(uuid, stampInfo, successCallback, url);
          })
          .catch((error) => {
            console.error("Upload to Storage failed", error);
          });
      });
    })
  )
    .then(() => {
      console.log("Uploaded all images!");
      if (stampsInfo.customTags.length > 0) {
        // update the custom tags to the tags database
        get(ref_database(db, "tags/"))
          .then((snapshot) => {
            const currTags = snapshot.val() || [];
            const updatedTags = [...currTags, ...stampsInfo.customTags];

            set(ref_database(db, "tags/"), updatedTags)
              .then(function () {
                window.alert("Uploaded with custom tags!");
                successCallback();
              })
              .catch(function (error) {
                console.error("error with updating tags", error);
              });
          })
          .catch((error) => {
            console.error("error with getting tags from database", error);
          });
      } else {
        window.alert("Uploaded!");
        successCallback();
      }
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message);
    });
};

const uploadSetToDatabase = (uuid, stampInfo, successCallback, fileLink) => {
  // set(ref_database(db, "stampInfo/sets/" + uuid), {
  set(ref_database(db, "stampInfo/tester/sets/" + uuid), {
    name: stampInfo.name,
    value: stampInfo.value,
    date: stampInfo.date,
    description: stampInfo.description,
    image: fileLink,
    owned: stampInfo.owned,
  })
    .then(function () {
      successCallback();
    })
    .catch(function (error) {
      console.error("Synchronization failed", error);
    });
};

/*
 *
 * AUTHENTICATION STUFF HERE
 *
 */

const auth = getAuth();
const provider = new GoogleAuthProvider();

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
      const email = error.customData.email;
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

export {
  initialPost,
  retrieveCatalog,
  retrieveTags,
  uploadSingle,
  uploadSet,
  logIn,
  logOut,
};
