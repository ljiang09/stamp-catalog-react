import {React, useState} from "react";
import {FormControl, TextField, Button, FormControlLabel, Checkbox} from '@mui/material';

function UploadOneStamp() {
    return (
        <>
            <h2>Single</h2>
            <FormControl>
                <TextField size='small' label="Stamp Name" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' label="Value" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' label="Date" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' label="Description" variant="outlined" style={{marginBottom: "10px"}} />
                <TextField size='small' label="Image Link" variant="outlined" style={{marginBottom: "10px"}} />
                <FormControlLabel required control={<Checkbox />} label="Owned" />
                <Button variant="outlined">Submit</Button>
            </FormControl>
        </>
    );
    }


export default UploadOneStamp;
