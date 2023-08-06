import { React, useEffect } from "react";
import { Button, Dialog, Box, Typography, Grid } from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import useStyles from "./styles.js";

function UploadImageDialog({
  openImgUpload,
  imgFile,
  imagePreview,
  setImagePreview,
  savableImg,
  handleImgUploadClose,
  handleFileChange,
  handleImgUploadSave,
}) {
  const classes = useStyles();

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

  return (
    <Dialog open={openImgUpload} onClose={handleImgUploadClose}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.dialogGrid}
      >
        <Button
          variant="outlined"
          component="label"
          className={classes.uploadBtn}
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
          <Box className={classes.imgDisplay}>
            <img src={imagePreview} alt="stamp" className={classes.img} />
          </Box>
        ) : (
          // TODO: there should be a button to open the file explorer
          <Box className={classes.imgPlaceholder}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <ImageIcon className={classes.imgPlaceholderIcon} />
              </Grid>
              <Grid item>
                <Typography className={classes.text}>Upload a photo</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        <div className={classes.imgDialogButtons}>
          <Button variant="outlined" onClick={handleImgUploadClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleImgUploadSave}
            disabled={!savableImg}
          >
            Save
          </Button>
        </div>
      </Grid>
    </Dialog>
  );
}

export default UploadImageDialog;
