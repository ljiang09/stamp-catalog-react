import { React, useState, useEffect } from "react";
import {
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import InputField from "./InputField";
import { retrieveTags, uploadSingle } from "../../server/Firebase";

function UploadSet() {
  const [stampSetName, setStampSetName] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [owned, setOwned] = useState(false);
  const [tags, setTags] = useState([]);

  const [showingSetNameError, setShowingSetNameError] = useState(false);
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

  const addStamp = () => {
    console.log("adding a new stamp input");
  };

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
      const stampInfo = {
        name,
        value,
        date,
        description,
        imgLink,
        owned,
        tags,
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

  return (
    <>
      <h2>Set</h2>

      <FormControl>
        <InputField
          value={stampSetName}
          handleChange={(event) => setStampSetName(event.target.value)}
          label="Set Name"
          info={null}
          error={showingSetNameError}
          errorMsg={showingSetNameError ? "Set name must be 3+ characters" : ""}
        />
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
            <TextField {...params} label="Set Tags" variant="outlined" />
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
            marginBottom: "30px",
            width: "200px",
          }}
        />

        <h3 style={{ marginBottom: 0 }}>Stamp #1</h3>
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
        {/* <Button variant="outlined" onClick={() => {setOpenImgUpload(true)}}>Choose Image</Button> */}
        <InputField
          value={imgLink}
          handleChange={(event) => setImgLink(event.target.value)}
          label="Image Link"
          info={null}
          error={showingImgError}
          errorMsg={showingImgError ? "Link must be valid" : ""}
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
          onClick={addStamp}
          style={{
            width: "200px",
            marginBottom: "15px",
            color: "green",
            borderColor: "green",
          }}
        >
          Add Stamp
        </Button>
        <Button
          variant="outlined"
          onClick={handleClick}
          style={{ width: "200px" }}
        >
          Submit
        </Button>
        <div style={{ height: "100px" }} />
      </FormControl>
    </>
  );
}

export default UploadSet;
