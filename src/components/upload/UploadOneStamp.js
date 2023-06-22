import { React, useState, useEffect } from "react";
import {
  FormControl,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
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

    const [showingNameError, setShowingNameError] = useState(false);
    const [showingImgError, setShowingImgError] = useState(false);

  const [tagsOptions, setTagsOptions] = useState([]);

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
                {/* TODO: replace the date input with calendar selection */}
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
                {/* TODO: add upload image button */}
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
        {/* TODO: when user adds custom input, add it to tags list in backend upon submission */}
        {/* TODO: prevent menu from closing upon selecting a tag */}
        <Autocomplete
          multiple
          value={tags}
          onChange={(event, values) => {
            setTags(values);
          }}
          options={tagsOptions}
          renderInput={(params) => (
            <TextField {...params} label="Tags" variant="outlined" />
          )}
          style={{ marginBottom: "10px", width: "200px" }}
        />
        <Button variant="outlined" onClick={handleClick}>
          Submit
        </Button>
        <div style={{ height: "100px" }} />
            </FormControl>
        </>
    );
    }

export default UploadOneStamp;
