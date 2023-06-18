import {React, useState} from "react";
import {ToggleButton, ToggleButtonGroup} from '@mui/material';
import UploadOneStamp from "./UploadOneStamp"

function Upload() {
    const [uploadType, setUploadType] = useState('single');

    const handleUploadType = (event, newUploadType) => {
        setUploadType(newUploadType);
        // show either the single or set view
    };

    // handle submit - add a UID to it

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

            <div style={{width: "300px", margin: "0px 40vw"}}>
                {(uploadType === "single") ? (
                    <UploadOneStamp />
                ) : (
                    <>
                        <h2>Set</h2>
                        <form style={{textAlign: "left"}}>
                            <label>Set Name</label>
                            <input type="text" />
                            <br />
                            <br />
                            <label>Stamp name</label>
                            <input type="text" />
                            <br />
                            <label>Value</label>
                            <input type="text" />
                            <br />
                            <label>Date</label>
                            <input type="text" />
                            <br />
                            <label>Description</label>
                            <input type="text" />
                            <br />
                            <label>Image Link</label>
                            <input type="text" />
                            <br />
                            <label>Owned</label>
                            <input type="checkbox" />
                            <br />
                            <input type="submit" />
                        </form>
                    </>
                )}
            </div>
        </>
    );
    }


export default Upload;
