import React from "react";
import {Button} from '@mui/material';


const StampButton = ({imageSrc, alt, imageStyle}) => {
    return (
        <Button
            style={{
                display: "inline-block",
                width: "9vw",
                margin: "0 1%",
                padding: "0"
            }}
        >
            <img src={imageSrc} alt={alt}
                style={{display: "block", width: "100%", ...imageStyle}} />
        </Button>
    );
};

export default StampButton;
