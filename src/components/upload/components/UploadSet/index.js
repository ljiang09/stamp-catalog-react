import { React, useState, useEffect } from "react";
import {
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

import { retrieveTags, uploadSingle } from "../../../../server/Firebase";

import InputField from "../InputField";
import UploadImageDialog from "../UploadImageDialog";
import useStyles from "./styles.js";

function UploadSet() {
  const [stampSetName, setStampSetName] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [owned, setOwned] = useState(false);
  const [tags, setTags] = useState([]);

  const [openImgUpload, setOpenImgUpload] = useState(false);
  // TODO: use imgFile properties for file size (to calculate compression), and maybe to display name
  const [imgFile, setImgFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [savableImg, setSavableImg] = useState(false);

  const [showingSetNameError, setShowingSetNameError] = useState(false);
  const [showingNameError, setShowingNameError] = useState(false);
  const [showingImgError, setShowingImgError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const classes = useStyles();

  const addStamp = () => {
    console.log("TODO (lily): adding a new stamp input");
  };

  const handleClick = () => {
    setShowingSetNameError(false);
    setShowingNameError(false);
    setShowingImgError(false);
    let error = false; // TODO (lily): probably can remove this variable completely

    if (stampSetName.trim().length < 3) {
      error = true;
      setShowingSetNameError(true);
    }
    // TODO: map all the values and set specific errors
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

  const handleImgUploadClose = () => {
    setOpenImgUpload(false);
    setImgFile(null);
    setImagePreview(null);
  };

  const handleImgUploadSave = () => {
    setOpenImgUpload(false);
  };

  const handleFileChange = (event) => {
    setImgFile(event.target.files[0]);
  };

  // TODO: figure out a way to update the tagsOptions upon new tags being entered
  useEffect(() => {
    retrieveTags((value) => {
      setTagsOptions(value);
    });
  }, []);

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setImagePreview(null);
    }
  }, [imgFile]);

  useEffect(() => {
    if (imagePreview) {
      setSavableImg(true);
    } else {
      setSavableImg(false);
    }
  }, [imagePreview]);

  const imgDialogProps = {
    openImgUpload,
    imgFile,
    imagePreview,
    savableImg,
    handleImgUploadClose,
    handleFileChange,
    handleImgUploadSave,
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
        <Button
          variant="outlined"
          onClick={() => {
            setOpenImgUpload(true);
          }}
          className={showingImgError ? classes.imgError : classes.imgDialog}
        >
          {imgFile ? "Edit Image" : "Choose Image"}
        </Button>
        {showingImgError && (
          <Typography variant="caption">Must select an image</Typography>
        )}
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
          style={{ width: "200px", marginBottom: "100px" }}
        >
          Submit
        </Button>
      </FormControl>
      <UploadImageDialog {...imgDialogProps} />
    </>
  );
}

export default UploadSet;
