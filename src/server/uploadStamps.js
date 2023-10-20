import {
  get,
  ref as ref_database,
  set,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {
  getDownloadURL,
  ref as ref_storage,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { storage, db } from "./firebaseInit";

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

export { uploadSingle, uploadSet };
