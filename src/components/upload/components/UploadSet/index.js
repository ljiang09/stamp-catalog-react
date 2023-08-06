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

import { retrieveTags, uploadSet } from "../../../../server/Firebase";

import InputField from "../InputField";
import UploadImageDialog from "../UploadImageDialog";
import useStyles from "./styles.js";

const initialValues = {
  name: "",
  value: "",
  date: "",
  description: "",
  imgLink: "",
  owned: false,
};

function UploadSet() {
  const [stampSetName, setStampSetName] = useState("");
  const [tags, setTags] = useState([]);

  const [inputSets, setInputSets] = useState([initialValues]);

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
    setInputSets([...inputSets, { ...initialValues }]);
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
    if (inputSets[0].name.trim().length < 3) {
      error = true;
      setShowingNameError(true);
    }
    // TODO: figure out some way to verify that the submitted link is valid
    if (inputSets[0].imgLink.trim().length < 3) {
      error = true;
      setShowingImgError(true);
    }

    // if all good, submit to firebase
    if (!error) {
      const stampInfo = {
        inputSets,
        tags,
      };

      const clearInputs = () => {
        // TODO: need to remove all the "added" set inputs
        setInputSets(initialValues);
        setStampSetName("");
        setTags([]);
      };

      // uploadSet(stampInfo, clearInputs);
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
          className={classes.tags}
        />

        {inputSets.map((inputSet, index) => {
          return (
            <>
              <h3 style={{ marginBottom: 0 }}>Stamp #{index + 1}</h3>
              <InputField
                value={inputSet.name}
                handleChange={(event) => {
                  const updatedObject = {
                    ...inputSet,
                    name: event.target.value,
                  };
                  const updatedArray = [...inputSets];
                  updatedArray[index] = updatedObject;
                  setInputSets(updatedArray);
                }}
                label="Stamp Name"
                info="Name of the individual stamp"
                error={showingNameError}
                errorMsg={showingNameError ? "Name must be 3+ characters" : ""}
              />
              <InputField
                value={inputSet.value}
                handleChange={(event) => {
                  const updatedObject = {
                    ...inputSet,
                    value: event.target.value,
                  };
                  const updatedArray = [...inputSets];
                  updatedArray[index] = updatedObject;
                  setInputSets(updatedArray);
                }}
                label="Value"
                info="Monetary value listed on stamp"
              />
              <InputField
                value={inputSet.date}
                handleChange={(event) => {
                  const updatedObject = {
                    ...inputSet,
                    date: event.target.value,
                  };
                  const updatedArray = [...inputSets];
                  updatedArray[index] = updatedObject;
                  setInputSets(updatedArray);
                }}
                label="Date"
                info="Date stamp was released"
              />
              <InputField
                value={inputSet.description}
                handleChange={(event) => {
                  const updatedObject = {
                    ...inputSet,
                    description: event.target.value,
                  };
                  const updatedArray = [...inputSets];
                  updatedArray[index] = updatedObject;
                  setInputSets(updatedArray);
                }}
                label="Description"
                info="Brief overview"
              />
              {/* TODO: add button that shows a dialog. there, choose between uploading or setting url */}
              {/* TODO: make this different reference for each object */}
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenImgUpload(true);
                }}
                className={
                  showingImgError ? classes.imgError : classes.imgDialog
                }
              >
                {imgFile ? "Edit Image" : "Choose Image"}
              </Button>
              {showingImgError && (
                <Typography variant="caption">Must select an image</Typography>
              )}
              <FormControlLabel
                checked={inputSet.owned}
                onChange={(event) => {
                  const updatedObject = {
                    ...inputSet,
                    owned: event.target.value,
                  };
                  const updatedArray = [...inputSets];
                  updatedArray[index] = updatedObject;
                  setInputSets(updatedArray);
                }}
                required
                control={<Checkbox />}
                label="Owned"
              />
            </>
          );
        })}
        <Button
          variant="outlined"
          onClick={addStamp}
          className={classes.addStampBtn}
        >
          Add Stamp
        </Button>
        <Button
          variant="outlined"
          onClick={handleClick}
          className={classes.submitBtn}
        >
          Submit
        </Button>
      </FormControl>
      <UploadImageDialog {...imgDialogProps} />
    </>
  );
}

export default UploadSet;
