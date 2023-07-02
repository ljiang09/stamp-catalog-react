import { Autocomplete, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { retrieveCatalog, retrieveTags } from "../../server/Firebase";

import StampButton from "./components/StampButton";
import BinderImage from "./StampBinder.png";
import useStyles from "./styles.js";

function Catalog() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [displayedStamps, setDisplayedStamps] = useState({});
  const [stampInfo, setStampInfo] = useState({});
  const [tagsList, setTagsList] = useState([]);

  const classes = useStyles();

  // retrieve data from firebase upon loading
  useEffect(() => {
    retrieveCatalog(setStampInfo);
    retrieveTags((value) => {
      setTagsList(value);
    });
  }, []);

  useEffect(() => {
    // set the displayedStamps based on the selected filters
    if (selectedFilters.length === 0) {
      setDisplayedStamps(stampInfo);
    } else {
      const newDisplayedStamps = Object.entries(stampInfo.sets).reduce(
        (acc, [key, value]) => {
          const hasMatchingTags = value.tags.some((tag) =>
            selectedFilters.includes(tag)
          );
          if (hasMatchingTags) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      const obj = { sets: newDisplayedStamps };
      setDisplayedStamps(obj);
    }
  }, [stampInfo, selectedFilters]);

  const navigate = useNavigate();

  const handleClick = (setID, stampObj) => {
    // sets will have a "stamps" key
    if ("stamps" in stampObj) {
      navigate(`/info/${setID}`);
    } else {
      // if set, use "setID". if single, use basic ID
      console.log("Single stamp clicked");
    }
  };

  return (
    <>
      <h2>Lily's Stamps</h2>
      {/* need the selected parameters to update the thing */}
      <Autocomplete
        multiple
        options={tagsList}
        onChange={(event, value) => setSelectedFilters(value)}
        renderInput={(params) => <TextField {...params} label="Filter by:" />}
        className={classes.filterBy}
      />

      <p>
        Sort by: All (other options: sets, singles, full sets, owned, clocks,
        christmas, other categories)
      </p>

      <div style={{ height: "0.5vw" }}></div>

      <img
        src={BinderImage}
        alt="stamp binder page"
        className={classes.binderBackground}
      />

      <div style={{ height: "0.5vw" }}></div>

      {displayedStamps.hasOwnProperty("singles") &&
        Object.entries(displayedStamps.singles).map(([key, value]) => (
          <div className={classes.stampRow} key={key}>
            <StampButton
              key={value.id}
              obj={value}
              setName={null}
              tags={value.tags}
              alt="button"
              handleClick={() => handleClick(key, value)}
            />
          </div>
        ))}
      {displayedStamps.hasOwnProperty("sets") &&
        Object.entries(displayedStamps.sets).map(([key, value]) => (
          <div className={classes.stampRow} key={key}>
            {value.stamps.map((obj) => (
              <StampButton
                key={obj.id}
                obj={obj}
                setName={value.setName}
                tags={value.tags}
                alt="button"
                handleClick={() => handleClick(key, value)}
              />
            ))}
          </div>
        ))}
    </>
  );
}

export default Catalog;
