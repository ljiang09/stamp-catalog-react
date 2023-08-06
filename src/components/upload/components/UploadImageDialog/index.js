import { React } from "react";
import {
  Button,
  TextField,
  Dialog,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Image as ImageIcon } from "@mui/icons-material";
import useStyles from "./styles.js";

function UploadImageDialog({
  openImgUpload,
  imgUploadType,
  imgLink,
  setImgLink,
  imgLinkValid,
  imgFile,
  imagePreview,
  savableImg,
  handleImgUploadClose,
  handleUploadType,
  handleFileChange,
  handleImgUploadSave,
}) {
  const classes = useStyles();

  return (
    <Dialog open={openImgUpload} onClose={handleImgUploadClose}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.dialogGrid}
      >
        <ToggleButtonGroup
          value={imgUploadType}
          onChange={handleUploadType}
          exclusive
          className={classes.imgToggle}
        >
          <ToggleButton value="url">Paste Link</ToggleButton>
          <ToggleButton value="file">Upload</ToggleButton>
        </ToggleButtonGroup>
        {imgUploadType === "url" ? (
          <>
            <TextField
              autoFocus
              size="small"
              value={imgLink}
              onChange={(event) => setImgLink(event.target.value)}
              label="Image Link"
              variant="outlined"
              className={classes.imgLinkInput}
            />
            {imgLinkValid ? (
              <Box className={classes.imgDisplay}>
                <img src={imgLink} alt="stamp" className={classes.img} />
              </Box>
            ) : (
              // TODO: there should be a button that places the focus on the textfield
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
                    <Typography className={classes.text}>
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
              className={classes.imgLinkInput}
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
                    <Typography className={classes.text}>
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
          className={classes.imgDialogButtons}
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
  );
}

export default UploadImageDialog;
