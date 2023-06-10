import React from "react";
import {Tooltip, Fade} from '@mui/material';
import useStyles from './styles.js'


const StampTooltip = ({ stampInfo, children }) => {
    const classes = useStyles();

    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={
            <>
                <h3 style={{fontSize: "1.25vw", padding: "0 0.5vw"}}>{stampInfo.description}</h3>
                <p style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.setName}</p>
                <p style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.value}</p>
                <p style={{fontSize: "1vw", padding: "0 0.5vw"}}>{stampInfo.date}</p>
                <div style={{maxWidth: "14vw", padding: "1vw 0.5vw", overflowX: "auto", whiteSpace: 'nowrap'}}>
                  {stampInfo.tags.map((tag) => (
                    <span style={{fontSize: "1vw", background: "black", padding: "0.4vw 0.75vw", borderRadius: "5vw", marginRight: "0.5vw"}}>
                      {tag}
                    </span>
                  ))}
                </div>
            </>
        }
        arrow
        placement="bottom"
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
