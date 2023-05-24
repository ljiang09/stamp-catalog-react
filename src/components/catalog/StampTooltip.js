import React from "react";
import {Tooltip, Fade} from '@mui/material';


const StampTooltip = ({ stampInfo, open, children }) => {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={
            <>
                <h3 style={{fontSize: "1.25vw", padding: "0 0.5vw"}}>{stampInfo.setName}</h3>
                <div style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.value}</div>
                <div style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.date}</div>
                <p style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.description}</p>
            </>
        }
        arrow
        placement="bottom"
        open={open}
        PopperProps={{
          style: {
            maxWidth: "15vw",
            opacity: 1, // Set the desired opacity value here
          }
      }}
      >
        {children}
      </Tooltip>
    );
};

export default StampTooltip;
