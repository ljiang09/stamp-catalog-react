import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import {
  get,
  getDatabase,
  ref as ref_database,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {
  getDownloadURL,
  getStorage,
  ref as ref_storage,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { useState } from "react";

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

  if (stampInfo.imgLink) {
    uploadSingleToDatabase(uuid, stampInfo, successCallback, null);
  } else {
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
  }
};

const uploadSingleToDatabase = (uuid, stampInfo, successCallback, fileLink) => {
  set(ref_database(db, "stampInfo/singles/" + uuid), {
    // set(ref_database(db, "stampInfo/tester/" + uuid), {
    name: stampInfo.name,
    value: stampInfo.value,
    date: stampInfo.date,
    description: stampInfo.description,
    image: fileLink ? fileLink : stampInfo.imgLink,
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

export { initialPost, retrieveCatalog, retrieveTags, uploadSingle };
