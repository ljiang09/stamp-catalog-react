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

import { retrieveTags } from "../../../../server/firebaseInit";
import { uploadSet } from "../../../../server/uploadStamps";

import InputField from "../InputField";
import UploadImageDialog from "../UploadImageDialog";
import useStyles from "./styles.js";

const initialValues = {
  name: "",
  value: "",
  date: "",
  description: "",
  owned: false,
  imgFile: null,
  showingNameError: false,
  showingImgError: false,
};

function UploadSet() {
  const [stampSetName, setStampSetName] = useState("");
  const [tags, setTags] = useState([]);

  const [inputSets, setInputSets] = useState([initialValues]);

  const [openImgUpload, setOpenImgUpload] = useState(false);
  // TODO: use imgFile properties for file size (to calculate compression), and maybe to display name
  const [currIndex, setCurrIndex] = useState(0);

  const [imagePreview, setImagePreview] = useState(null);
  const [savableImg, setSavableImg] = useState(false);

  const [showingSetNameError, setShowingSetNameError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const classes = useStyles();

  const addStamp = () => {
    setInputSets([...inputSets, { ...initialValues }]);
  };

  const handleClick = () => {
    let error = false;

    setShowingSetNameError(false);
    if (stampSetName.trim().length < 3) {
      setShowingSetNameError(true);
      error = true;
    }

    let updatedObject = {};
    inputSets.forEach((inputSet, index) => {
      if (inputSet.name.trim().length < 3) {
        updatedObject = {
          ...inputSet,
          showingNameError: true,
          showingImgError: false,
        };
        error = true;
      } else {
        updatedObject = {
          ...inputSet,
          showingNameError: false,
          showingImgError: false,
        };
      }
      const updatedArray = [...inputSets];
      updatedArray[index] = updatedObject;
      setInputSets(updatedArray);
    });

    // if all good, submit to firebase
    if (!error) {
      const customTags = tags.filter((option) => !tagsOptions.includes(option));

      const stampsInfo = {
        inputSets,
        tags,
        customTags,
      };

      const clearInputs = () => {
        // TODO: need to remove all the "added" set inputs
        setCurrIndex(0);
        setInputSets([initialValues]);
        setStampSetName("");
        setTags([]);
      };

      uploadSet(stampsInfo, clearInputs);
    }
  };

  const handleImgUploadOpen = (index) => {
    if (inputSets[index].imgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(inputSets[index].imgFile);
    } else {
      setImagePreview(null);
    }

    setCurrIndex(index);
    setOpenImgUpload(true);
  };

  const handleImgUploadClose = () => {
    setOpenImgUpload(false);
    setImagePreview(null);

    const updatedObject = {
      ...inputSets[currIndex],
      imgFile: null,
    };
    const updatedArray = [...inputSets];
    updatedArray[currIndex] = updatedObject;
    setInputSets(updatedArray);
  };

  const handleImgUploadSave = () => {
    setOpenImgUpload(false);
  };

  const handleFileChange = (event) => {
    // TODO (lily): change this to rely on the index

    const updatedObject = {
      ...inputSets[currIndex],
      imgFile: event.target.files[0],
    };

    const updatedArray = [...inputSets];
    updatedArray[currIndex] = updatedObject;
    setInputSets(updatedArray);
  };

  // TODO: figure out a way to update the tagsOptions upon new tags being entered
  useEffect(() => {
    retrieveTags((value) => {
      setTagsOptions(value);
    });
  }, []);

  useEffect(() => {
    if (imagePreview) {
      setSavableImg(true);
    } else {
      setSavableImg(false);
    }
  }, [imagePreview]);

  const imgDialogProps = {
    openImgUpload,
    imgFile: inputSets[currIndex].imgFile,
    imagePreview,
    setImagePreview,
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
          const showingNameError = inputSet.showingNameError;
          const showingImgError = inputSet.showingImgError;
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
              <Button
                variant="outlined"
                onClick={() => {
                  handleImgUploadOpen(index);
                }}
                className={
                  showingImgError ? classes.imgError : classes.imgDialog
                }
              >
                {inputSets[index].imgFile ? "Edit Image" : "Choose Image"}
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
