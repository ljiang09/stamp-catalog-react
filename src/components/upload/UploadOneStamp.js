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
  Box,
  Typography,
  Grid,
} from "@mui/material";
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import InputField from "./InputField";
import { retrieveTags, uploadSingle } from "../../server/Firebase";
import useStyles from "./styles.js";

function UploadOneStamp() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [owned, setOwned] = useState(false);
  const [tags, setTags] = useState([]);

  const [openImgUpload, setOpenImgUpload] = useState(false);
  const [imgUploadType, setImgUploadType] = useState("url");
  const [imgLink, setImgLink] = useState("");
  const [imgLinkValid, setImgLinkValid] = useState(false);
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

    // only name and image link are required here
    if (name.trim().length < 3) {
      error = true;
      setShowingNameError(true);
    }
    if (!imgLink && !imagePreview) {
      error = true;
      setShowingImgError(true);
    }

    // if all good, submit to firebase
    if (!error) {
      const customTags = tags.filter((option) => !tagsOptions.includes(option));

      // choose either the imgLink or imagePreview to submit
      const submittableImg = imgLink ? imgLink : imagePreview;

      const stampInfo = {
        name,
        value,
        date,
        description,
        submittableImg,
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
    setImgLinkValid(false);
    setImgFile(null);
    setImagePreview(null);
  };

  const handleImgUploadSave = () => {
    // TODO: add error handling

    if (imgUploadType === "url") {
      setImgFile(null);
      setImagePreview(null);
    } else {
      setImgLink("");
      setImgLinkValid(false);
    }

    setOpenImgUpload(false);
  };

  const handleUploadType = (event, newUploadType) => {
    if (newUploadType) {
      setImgUploadType(newUploadType);
    }
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

  // determine if img URL is valid
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgLinkValid(true);
    };
    img.onerror = () => {
      setImgLinkValid(false);
    };
    img.src = imgLink;
  }, [imgLink]);

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
    if (
      (imgUploadType === "url" && imgLinkValid) ||
      (imgUploadType === "file" && imagePreview)
    ) {
      setSavableImg(true);
    } else {
      setSavableImg(false);
    }
  }, [imgUploadType, imgLinkValid, imagePreview]);

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
          style={{
            width: "200px",
            marginTop: "15px",
            color: "black",
          }}
          className={showingImgError && classes.imgError}
        >
          {imgLinkValid || imgFile ? "Edit Image" : "Choose Image"}
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
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{
            width: "240px",
            height: "400px",
          }}
        >
          <ToggleButtonGroup
            value={imgUploadType}
            onChange={handleUploadType}
            exclusive
            style={{ margin: "20px 0" }}
          >
            <ToggleButton value="url">Paste Link</ToggleButton>
            <ToggleButton value="file">Upload</ToggleButton>
          </ToggleButtonGroup>
          {imgUploadType === "url" ? (
            <>
              {/* TODO: change the error handling of this */}
              <TextField
                autoFocus
                size="small"
                value={imgLink}
                onChange={(event) => setImgLink(event.target.value)}
                label="Image Link"
                variant="outlined"
                style={{ height: "40px", width: "200px" }}
                // helperText={errorMsg}
                // className={error && classes.error}
                // error={showingImgError}
                // errorMsg={showingImgError ? "Link must be valid" : ""}
              />
              {imgLinkValid ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={imgLink}
                    alt="stamp"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Box>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "200px",
                    height: "200px",
                    background: "lightgray",
                    marginTop: "10px",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <ImageIcon
                        style={{
                          fontSize: "50px",
                          color: "gray",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "gray",
                        }}
                      >
                        Enter a valid URL
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                component="label"
                style={{ height: "40px", width: "200px" }}
              >
                {imgFile ? "Edit Image" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {imagePreview ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="stamp"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </Box>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "200px",
                    height: "200px",
                    background: "lightgray",
                    marginTop: "10px",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <ImageIcon
                        style={{
                          fontSize: "50px",
                          color: "gray",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "gray",
                        }}
                      >
                        Upload a photo
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}
          <Grid
            container
            direction="row"
            style={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            columnSpacing={1}
          >
            <Grid item>
              <Button variant="outlined" onClick={handleImgUploadClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleImgUploadSave}
                disabled={!savableImg}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default UploadOneStamp;
