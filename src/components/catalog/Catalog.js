import {React, useState, useEffect} from "react";
import {GlobalStyles, Button, Tooltip} from '@mui/material';
import BinderImage from "./StampBinder.png";
import StampTooltip from "./StampTooltip";
import StampButton from "./StampButton";
import stampInfo from "./StampData";


function Catalog() {
    const [stampOfInterest, setStampOfInterest] = useState("");

    const handleClick = (stampName) => {
        if (stampName === stampOfInterest) {
            setStampOfInterest("");
        } else {
            setStampOfInterest(stampName);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('button')) {
            setStampOfInterest("");
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <h2>Lily's Stamps</h2>
            <p>Sort by: All (other options: sets, singles, full sets, owned, clocks, christmas, other categories)</p>

            <img src={BinderImage} alt="stamp binder page" style={{
                position: "absolute",
                width: "70%",
                left: "13%",
                zIndex: -10
            }} />

            <div style={{height: "0.5vw"}}></div>

            {stampInfo.sets.map((set) => (
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "64vw",
                    marginLeft: "18vw"
                }}>
                    {set.map((obj) => (
                        <StampTooltip
                            stampInfo={obj}
                            open={stampOfInterest === obj.id}
                        >
                            <Button
                                onClick={() => handleClick(obj.id)}
                                style={{
                                    display: "inline-block",
                                    height: "9.5vw",
                                    margin: "0.85vw 1vw",
                                    padding: "0"
                                }}
                            >
                                <img
                                    src={obj.image}
                                    alt=""
                                    style={{
                                        display: "inline-block",
                                        height: "100%",
                                        filter: (obj.owned) ? "none" : "brightness(50%)"
                                    }}
                                />
                            </Button>
                        </StampTooltip>
                    ))}
                </div>
            ))}

        </>
    )
}

export default Catalog;


// TODO:
// change tooltip back to show info on hover. reserve click for navigating to new page for more info?
// make tooltip background opaque
// add tags to each stamp, for easier filtering
