import { React, useState, useEffect } from "react";
import {
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Dialog,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import InputField from "./InputField";
import { retrieveTags, uploadSingle } from "../../server/Firebase";

function UploadOneStamp() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [owned, setOwned] = useState(false);
  const [tags, setTags] = useState([]);
  const [openImgUpload, setOpenImgUpload] = useState(false);
  const [imgUploadType, setImgUploadType] = useState("url");

  const [showingNameError, setShowingNameError] = useState(false);
  const [showingImgError, setShowingImgError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // TODO: figure out a way to update the tagsOptions upon new tags being entered
  useEffect(() => {
    retrieveTags((value) => {
      setTagsOptions(value);
    });
  }, []);

  const handleClick = () => {
    setShowingNameError(false);
    setShowingImgError(false);
    let error = false;

    // only name and image link are required here
    if (name.trim().length < 3) {
      error = true;
      setShowingNameError(true);
    }
    // TODO: figure out some way to verify that the submitted link is valid
    if (imgLink.trim().length < 3) {
      error = true;
      setShowingImgError(true);
    }

    // if all good, submit to firebase
    if (!error) {
      const customTags = tags.filter((option) => !tagsOptions.includes(option));

      const stampInfo = {
        name,
        value,
        date,
        description,
        imgLink,
        owned,
        tags,
        customTags,
      };

      const clearInputsSingle = () => {
        setName("");
        setValue("");
        setDate("");
        setDescription("");
        setImgLink("");
        setOwned(false);
        setTags([]);
      };

      uploadSingle(stampInfo, clearInputsSingle);
    }
  };

  const handleImgUploadClose = () => {
    setOpenImgUpload(false);
    setImgLink("");
  };

  const handleImgUploadSave = () => {
    setOpenImgUpload(false);
  };

  const handleUploadType = (event, newUploadType) => {
    if (newUploadType) {
      setImgUploadType(newUploadType);
    }
  };

  return (
    <>
      <h2>Single</h2>
      <FormControl>
        <InputField
          value={name}
          handleChange={(event) => setName(event.target.value)}
          label="Stamp Name"
          info="Name of the individual stamp"
          error={showingNameError}
          errorMsg={showingNameError ? "Name must be 3+ characters" : ""}
        />
        <InputField
          value={value}
          handleChange={(event) => setValue(event.target.value)}
          label="Value"
          info="Monetary value listed on stamp"
        />
        <InputField
          value={date}
          handleChange={(event) => setDate(event.target.value)}
          label="Date"
          info="Date stamp was released"
        />
        <InputField
          value={description}
          handleChange={(event) => setDescription(event.target.value)}
          label="Description"
          info="Brief overview"
        />
        {/* TODO: add button that shows a dialog. there, choose between uploading or setting url */}
        {/* TODO: have error handling surrounding this button */}
        <Button
          variant="outlined"
          onClick={() => {
            setOpenImgUpload(true);
          }}
        >
          Choose Image
        </Button>
        {/* <InputField
          value={imgLink}
          handleChange={(event) => setImgLink(event.target.value)}
          label="Image Link"
          info={null}
          error={showingImgError}
          errorMsg={showingImgError ? "Link must be valid" : ""}
        /> */}
        {/* TODO: when user adds custom input, add it to tags list in backend upon submission */}
        {/* TODO: look at "creatable" header in MUI4 page and implement that. Particularly with the dialog popup */}
        <Autocomplete
          multiple
          freeSolo
          disableCloseOnSelect
          selectOnFocus
          value={tags}
          disableClearable
          forcePopupIcon
          onChange={(event, values) => {
            setTags(values);
          }}
          options={tagsOptions.sort()}
          renderInput={(params) => (
            <TextField {...params} label="Tags" variant="outlined" />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ margin: 0 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{
            marginTop: "15px",
            width: "200px",
          }}
        />
        <FormControlLabel
          checked={owned}
          onChange={(event) => setOwned(event.target.value)}
          required
          control={<Checkbox />}
          label="Owned"
        />
        <Button
          variant="outlined"
          onClick={handleClick}
          style={{ width: "200px" }}
        >
          Submit
        </Button>
        <div style={{ height: "100px" }} />
      </FormControl>
      <Dialog open={openImgUpload} onClose={handleImgUploadClose}>
        <div
          style={{
            padding: "20px",
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            value={imgUploadType}
            onChange={handleUploadType}
            exclusive
          >
            <ToggleButton value="url">Paste Link</ToggleButton>
            <ToggleButton value="file">Upload</ToggleButton>
          </ToggleButtonGroup>
          {imgUploadType === "url" ? (
            <>
              <InputField
                value={imgLink}
                handleChange={(event) => setImgLink(event.target.value)}
                label="Image Link"
                info={null}
                error={showingImgError}
                errorMsg={showingImgError ? "Link must be valid" : ""}
              />
              {imgLink.length < 10 ? (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    background: "gray",
                    marginTop: "10px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  Image appears here
                </div>
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "10px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={imgLink} alt="stamp" style={{ height: "100%" }} />
                </div>
              )}
            </>
          ) : (
            <div>button to file upload</div>
          )}

          {/* // TODO: display the uploaded image here */}

          {/* // in this dialog, display the image and handle it if it cannot be */}
          {/* displayed */}
        </div>
      </Dialog>
    </>
  );
}

export default UploadOneStamp;
