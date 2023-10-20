import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  get,
  getDatabase,
  ref as ref_database,
  set,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import {
  getAuth,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// https://firebase.google.com/docs/web/learn-more#libraries-cdn

import firebaseConfig from "./config";
import { stampInfo } from "../components/catalog/StampData";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getDatabase();
const auth = getAuth();
const provider = new GoogleAuthProvider();

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

  // TODO (oct 16 1;48 am): adding api key to allow read/write of realtime database. figure out why this is broken!
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

export {
  app,
  storage,
  db,
  auth,
  provider,
  initialPost,
  retrieveCatalog,
  retrieveTags,
};
