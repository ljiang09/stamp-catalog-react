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

function UploadOneStamp() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [owned, setOwned] = useState(false);
  const [tags, setTags] = useState([]);

  const [openImgUpload, setOpenImgUpload] = useState(false);
  // TODO: use imgFile properties for file size (to calculate compression), and maybe to display name
  const [imgFile, setImgFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [savableImg, setSavableImg] = useState(false);

  const [showingNameError, setShowingNameError] = useState(false);
  const [showingImgError, setShowingImgError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([]);

  const classes = useStyles();

  const handleClick = () => {
    setShowingNameError(false);
    setShowingImgError(false);
    let error = false;

    // only name and image are required here
    if (name.trim().length < 3) {
      error = true;
      setShowingNameError(true);
    }
    if (!imagePreview) {
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
        imgFile,
        owned,
        tags,
        customTags,
      };

      const clearInputsSingle = () => {
        setName("");
        setValue("");
        setDate("");
        setDescription("");
        handleImgUploadClose();
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
    setImgFile(null);
    setImagePreview(null);
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

  // store uploaded file as base64 to display
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

  // disable "save" button in image dialog
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
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ margin: 0 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          className={classes.tagsDropdown}
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
          className={classes.submitBtn}
        >
          Submit
        </Button>
        <div style={{ height: "100px" }} />
      </FormControl>
      <UploadImageDialog {...imgDialogProps} />
    </>
  );
}

export default UploadOneStamp;
