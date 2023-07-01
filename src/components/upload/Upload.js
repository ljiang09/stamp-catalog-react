import { React, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import UploadOneStamp from "./components/UploadOneStamp";
import UploadSet from "./components/UploadSet";

function Upload() {
  const [uploadType, setUploadType] = useState("single");

  const handleUploadType = (event, newUploadType) => {
    setUploadType(newUploadType);
  };

  return (
    <>
      <ToggleButtonGroup
        value={uploadType}
        exclusive
        onChange={handleUploadType}
      >
        <ToggleButton value="single">Single</ToggleButton>
        <ToggleButton value="set">Set</ToggleButton>
      </ToggleButtonGroup>

      <br />
      <br />

      {uploadType === "single" ? (
        <UploadOneStamp />
      ) : (
        <UploadSet />
        // <>
        //     <h2>Set</h2>
        //     <form style={{textAlign: "left"}}>
        //         <label>Set Name</label>
        //         <input type="text" />
        //         <br />
        //         <br />
        //         <label>Stamp name</label>
        //         <input type="text" />
        //         <br />
        //         <label>Value</label>
        //         <input type="text" />
        //         <br />
        //         <label>Date</label>
        //         <input type="text" />
        //         <br />
        //         <label>Description</label>
        //         <input type="text" />
        //         <br />
        //         <label>Image Link</label>
        //         <input type="text" />
        //         <br />
        //         <label>Owned</label>
        //         <input type="checkbox" />
        //         <br />
        //         <input type="submit" />
        //     </form>
        // </>
      )}
    </>
  );
}

export default Upload;
