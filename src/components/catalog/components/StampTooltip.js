import React from "react";
import { Tooltip, Fade } from "@mui/material";
import useStyles from "./styles.js";

const StampTooltip = ({ stampInfo, setName, tags, children }) => {
  const classes = useStyles();

  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
      title={
        <>
          {setName ? (
            <h3 className={classes.stampDescription}>
              {stampInfo.description}
            </h3>
          ) : (
            <h3 className={classes.stampDescription}>{stampInfo.name}</h3>
          )}
          {setName && <p className={classes.tooltipInfo}>{setName}</p>}
          <p className={classes.tooltipInfo}>{stampInfo.value}</p>
          <p className={classes.tooltipInfo}>{stampInfo.date}</p>
          <div className={classes.tagsSection}>
            {tags.map((tag) => (
              <span className={classes.tags} key={tag}>
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
          // opacity: 1, // Set the desired opacity value here
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default StampTooltip;
