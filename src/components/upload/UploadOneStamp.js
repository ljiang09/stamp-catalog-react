import {React, useState, useEffect} from "react";
import {FormControl, Button, FormControlLabel, Checkbox} from '@mui/material';
import InputField from "./InputField";
import { uploadSingle } from "../../server/Firebase";

function UploadOneStamp() {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [owned, setOwned] = useState(false);

    const [showingNameError, setShowingNameError] = useState(false);
    const [showingImgError, setShowingImgError] = useState(false);

    const handleClick = () => {
        setShowingNameError(false);
        setShowingImgError(false);
        let error = false;
        
        // only name and image link are required here
        if (name.trim().length < 3) {
            console.log("error with name");
            error = true;
            setShowingNameError(true);
        }
        // TODO: figure out some way to verify that the submitted link is valid
        if (imgLink.trim().length < 3) {
            console.log("error with iamge link");
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
                owned
            };

            uploadSingle(stampInfo);
            // TODO: somehow in the closure, clear all the text fields and check box
        }
    }

    return (
        <>
            <h2>Single</h2>
            {/* TODO: add info tooltips for each input */}
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
                <FormControlLabel checked={owned} onChange={(event) => setOwned(event.target.value)} required control={<Checkbox />} label="Owned" />
                <Button variant="outlined" onClick={handleClick}>Submit</Button>
            </FormControl>
        </>
    );
    }


export default UploadOneStamp;
