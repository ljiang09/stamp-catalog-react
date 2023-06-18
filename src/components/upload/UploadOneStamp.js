import {React, useState, useEffect} from "react";
import {FormControl, TextField, Button, FormControlLabel, Checkbox} from '@mui/material';

function UploadOneStamp() {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [owned, setOwned] = useState(false);

    const handleClick = () => {
        // check if any textfields are blank. if so, show error message
        // if all good, submit to firebase
    }

    return (
        <>
            <h2>Single</h2>
            {/* TODO: add info tooltips for each input */}
            <FormControl>
                <TextField size='small' value={name} onChange={(event) => setName(event.target.value)} label="Stamp Name" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' value={value} onChange={(event) => setValue(event.target.value)} label="Value" variant="outlined" style={{marginBottom: "10px"}} />
                {/* TODO: replace the date input with actual MM DD YYYY type input? */}
                <TextField size='small' value={date} onChange={(event) => setDate(event.target.value)} label="Date" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' value={description} onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' value={imgLink} onChange={(event) => setImgLink(event.target.value)} label="Image Link" variant="outlined" style={{marginBottom: "10px"}} />
                <FormControlLabel checked={owned} onChange={(event) => setOwned(event.target.value)} required control={<Checkbox />} label="Owned" />
                <Button variant="outlined" onClick={handleClick}>Submit</Button>
            </FormControl>
        </>
    );
    }


export default UploadOneStamp;
