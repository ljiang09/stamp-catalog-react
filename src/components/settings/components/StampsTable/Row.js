import { React, useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles.js";
import theme from "../../../../assets/theme.js";
import UploadImageDialog from "../../../upload/components/UploadImageDialog/index.js";

function Row({ values, initialSetName, initialTags, tagsOptions }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(values.name);
  const [date, setDate] = useState(values.date);
  const [value, setValue] = useState(values.value);
  const [description, setDescription] = useState(values.description);
  const [image, setImage] = useState(values.image);
  const [owned, setOwned] = useState(values.owned);
  const [height, setHeight] = useState(values.height);
  const [stampSetName, setStampSetName] = useState(initialSetName);
  const [tags, setTags] = useState(initialTags);

  const [openImgUpload, setOpenImgUpload] = useState(false);
  // TODO: use imgFile properties for file size (to calculate compression), and maybe to display name
  const [imgFile, setImgFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [savableImg, setSavableImg] = useState(false);

  const classes = useStyles();

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

  const autocompleteParams = {
    multiple: true,
    freeSolo: true,
    disableCloseOnSelect: true,
    selectOnFocus: true,
    disableClearable: true,
    forcePopupIcon: true,
  };

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
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell style={{ width: "10%" }}>
          {name ? (
            editing ? (
              <TextField
                value={name}
                onChange={(event) => setName(event.target.value)}
                label="Stamp Name"
              />
            ) : (
              name
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "9%" }}>
          {date ? (
            editing ? (
              <TextField
                value={date}
                onChange={(event) => setDate(event.target.value)}
                label="Date"
              />
            ) : (
              date
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {value ? (
            editing ? (
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                label="Value"
              />
            ) : (
              value
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "15%" }}>
          {description ? (
            editing ? (
              <TextField
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                label="Description"
              />
            ) : (
              description
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "15%" }}>
          {editing ? (
            <Button
              onClick={() => {
                setOpenImgUpload(true);
              }}
              style={{ padding: 0 }}
            >
              <img src={image} alt="stamp" style={{ width: "100%" }} />
            </Button>
          ) : image ? (
            <img src={image} alt="stamp" style={{ width: "100%" }} />
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          <FormControlLabel
            checked={owned}
            onChange={(event) => setOwned(event.target.value)}
            control={<Checkbox />}
            disabled={!editing}
            style={{ margin: 0 }}
          />
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {height ? (
            editing ? (
              <TextField
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                label="Height"
              />
            ) : (
              height
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "12%" }}>
          {stampSetName ? (
            editing ? (
              <TextField
                value={stampSetName}
                onChange={(event) => setStampSetName(event.target.value)}
                label="Set Name"
              />
            ) : (
              stampSetName
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "15%" }}>
          {tags ? (
            editing ? (
              <Autocomplete
                {...autocompleteParams}
                value={tags}
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
                // className={classes.tagsDropdown}
                style={{ maxHeight: "100px" }}
              />
            ) : (
              tags.map((tag) => <div>{tag}</div>)
            )
          ) : (
            "No tags"
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {editing ? (
            <>
              <IconButton onClick={() => setEditing(false)}>
                <CloseIcon style={{ display: "block" }} />
              </IconButton>
              <IconButton onClick={() => setEditing(false)}>
                <CheckIcon style={{ display: "block" }} />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon style={{ display: "block" }} />
              </IconButton>
              <IconButton
                onClick={() => setEditing(false)}
                style={{ visibility: "hidden" }}
              >
                <CloseIcon style={{ display: "block" }} />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
      <UploadImageDialog {...imgDialogProps} />
    </ThemeProvider>
  );
}

export default Row;
