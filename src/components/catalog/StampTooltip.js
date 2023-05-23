import React from "react";
import {Tooltip, Fade} from '@mui/material';


const StampTooltip = ({ stampInfo, open, children }) => {
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={
            <>
                <h3>{stampInfo.setName}</h3>
                <div>{stampInfo.value}</div>
                <div>{stampInfo.date}</div>
                <p>{stampInfo.description}</p>
            </>
        }
        arrow
        placement="bottom"
        open={open}
        PopperProps={{
          style: {
            maxWidth: "10vw",
            opacity: 1, // Set the desired opacity value here
          }
      }}
      >
        {children}
      </Tooltip>
    );
};

export default StampTooltip;
