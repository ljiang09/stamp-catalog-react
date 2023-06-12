import {React, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import { Autocomplete, TextField } from "@mui/material";
import BinderImage from "./StampBinder.png";
import StampButton from "./components/StampButton";
import {stampInfo, tagsList} from "./StampData";
import useStyles from './styles.js'

function Catalog() {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [displayedStamps, setDisplayedStamps] = useState(stampInfo);

    const classes = useStyles();

    useEffect(() => {
        // set the displayedStamps based on the selected filters
        if (selectedFilters.length === 0) {
            setDisplayedStamps(stampInfo);
        } else {
            const newDisplayedStamps = Object.entries(stampInfo.sets).reduce((acc, [key, value]) => {
                const hasMatchingTags = value.tags.some(tag => selectedFilters.includes(tag));
                if (hasMatchingTags) {
                  acc[key] = value;
                }
                return acc;
              }, {});
            const obj = {
                sets: newDisplayedStamps
            }
            setDisplayedStamps(obj);
        }
    }, [selectedFilters]);

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

            <p>Sort by: All (other options: sets, singles, full sets, owned, clocks, christmas, other categories)</p>

            <div style={{height: "0.5vw"}}></div>

            <img src={BinderImage} alt="stamp binder page" className={classes.binderBackground} />

            <div style={{height: "0.5vw"}}></div>

            {Object.entries(displayedStamps.sets).map(([key, value]) => (
                <div className={classes.stampRow}>
                    {value.stamps.map((obj) => (
                        <StampButton
                            key={obj.id}
                            obj={obj}
                            setName={value.setName}
                            tags={value.tags}
                            alt=""
                            handleClick={() => handleClick(key, value)}
                        />
                    ))}
                </div>
            ))}

        </>
    )
}

export default Catalog;
