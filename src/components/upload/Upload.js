import {React, useState} from "react";
import {ToggleButton, ToggleButtonGroup} from '@mui/material';


function Upload() {
    const [uploadType, setUploadType] = useState('single');

    const handleUploadType = (event, newUploadType) => {
        setUploadType(newUploadType);
        // show either the single or set view
    };    

    return (
        <>
            <ToggleButtonGroup
                value={uploadType}
                exclusive
                onChange={handleUploadType}
            >
                <ToggleButton value="single">
                    Single
                </ToggleButton>
                <ToggleButton value="set">
                    Set
                </ToggleButton>
            </ToggleButtonGroup>

            <br />
            <br />

            {(uploadType === "single") ? (
                <>
                    <h2>Single</h2>
                    <form>
                        <label>Stamp name</label>
                        <input type="text" />
                        <br />
                        <label>ncjksnj</label>
                        <input type="text" />
                        <br />
                        <input type="submit" />
                    </form>
                </>
            ) : (
                <>
                    <h2>Set</h2>
                </>
            )}
        </>
    );
    }


export default Upload;
