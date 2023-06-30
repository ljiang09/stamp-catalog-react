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

const firebaseConfig = {
  apiKey: "AIzaSyDS3xYZstK58Y8DgpHR8HCyKlJXi3N41cs",
  authDomain: "stamp-catalogue-6df49.firebaseapp.com",
  databaseURL: "https://stamp-catalogue-6df49-default-rtdb.firebaseio.com",
  projectId: "stamp-catalogue-6df49",
  storageBucket: "stamp-catalogue-6df49.appspot.com",
  messagingSenderId: "74536590288",
  appId: "1:74536590288:web:ab55c95d93d24baca8f7d5",
  measurementId: "G-3NVTTQ81P0",
};

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

// TODO: add better error handling
const uploadSingle = (stampInfo, successCallback) => {
  const uuid = uuidv4();

  if (stampInfo.imgLink) {
    console.log("image uploaded as link", stampInfo.imgLink);
    // TODO: bug where some links cause an error when trying to upload them to firebase

    // set(ref_database(db, 'stampInfo/singles/' + uuid), {
    set(ref_database(db, "stampInfo/tester/" + uuid), {
      name: stampInfo.name,
      value: stampInfo.value,
      date: stampInfo.date,
      description: stampInfo.description,
      imgLink: stampInfo.imgLink,
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
                  console.log("error with updating tags", error);
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
        console.log("Synchronization failed", error);
      });
  } else {
    console.log("image uploaded as file");

    // TODO: fix the file format of "stampInfo.imagePreview"
    uploadBytesResumable(
      ref_storage(storage, "images/singles/tester/" + uuid),
      stampInfo.imagePreview
    ).then((snapshot) => {
      // console.log('Uploaded image,', snapshot.totalBytes, 'bytes.');
      getDownloadURL(snapshot.ref)
        .then((url) => {
          // set(ref_database(db, 'stampInfo/singles/' + uuid), {
          set(ref_database(db, "stampInfo/tester/" + uuid), {
            name: stampInfo.name,
            value: stampInfo.value,
            date: stampInfo.date,
            description: stampInfo.description,
            imgLink: url,
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
                        console.log("error with updating tags", error);
                      });
                  })
                  .catch((error) => {
                    console.error(
                      "error with getting tags from database",
                      error
                    );
                  });
              } else {
                window.alert("Uploaded!");
                successCallback();
              }
            })
            .catch(function (error) {
              console.log("Synchronization failed", error);
            });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    });
  }
};

export { initialPost, retrieveCatalog, retrieveTags, uploadSingle };
