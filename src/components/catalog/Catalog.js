import {React, useState, useEffect} from "react";
import {GlobalStyles, Button, Tooltip} from '@mui/material';
import BinderImage from "./StampBinder.png";
import StampTooltip from "./StampTooltip";
import StampButton from "./StampButton";

// import './Catalog.css';


function Catalog() {
    const stampInfo = {
        "singles": {
        },
        "sets": [
            [
                {
                    "value": "24p",
                    "description": "Decorated enamel dial",
                    "date": "16 February 1993",
                    "image": "https://i.pinimg.com/236x/6a/36/07/6a3607fa9a02709a7b31e00f0beae0b1--uk-stamps-postage-stamps.jpg",
                    "id": "gVUK4Fpm8f",
                    "setName": "Marine Timekeepers"
                },
                {
                    "value": "28p",
                    "description": "Escapement, Remontoire and Fusee",
                    "date": "16 February 1993",
                    "image": "https://i.colnect.net/f/122/883/Escapement-Remontoire-and-Fusée.jpg",
                    "id": "aDU9DW2V99",
                    "setName": "Marine Timekeepers"
                }
            ]
        ]
    }

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
            <GlobalStyles styles={{ Tooltip: { opacity: '100%' } }} />
            <h2>Lily's Stamps</h2>
            <p>Sort by: All (other options: sets, singles, full sets, other categories)</p>

            <img src={BinderImage} alt="stamp binder page" style={{
                position: "absolute",
                width: "70%",
                left: "15%",
                zIndex: -10
            }} />

            <div style={{display: "inline-block", width: "100vw", marginTop: "1vw"}}>
                <StampTooltip
                    stampInfo={stampInfo.sets[0][1]}
                    open={stampOfInterest === stampInfo.sets[0][1].id}
                >
                    <Button
                        onClick={() => handleClick(stampInfo.sets[0][1].id)}
                        style={{
                            display: "inline-block",
                            width: "9%",
                            margin: "0 1%",
                            padding: "0"
                        }}
                    >
                        <img
                            src={stampInfo.sets[0][1].image}
                            alt=""
                            style={{
                                display: "inline-block",
                                width: "100%",
                                filter: "brightness(50%)"
                            }}
                        />
                    </Button>
                </StampTooltip>

                <Button
                    style={{
                        display: "inline-block",
                        width: "9%",
                        margin: "0 1%",
                        padding: "0"
                    }}
                >
                    <img
                        src="https://d2j6dbq0eux0bg.cloudfront.net/images/5904137/1429778373.jpg"
                        alt=""
                        style={{
                            display: "inline-block",
                            width: "100%",
                            filter: "brightness(50%)"
                        }}
                    />
                </Button>
                
                <StampTooltip
                    stampInfo={stampInfo.sets[0][0]}
                    open={stampOfInterest === stampInfo.sets[0][0].id}
                >
                    <Button
                        onClick={() => handleClick(stampInfo.sets[0][0].id)}
                        style={{
                            display: "inline-block",
                            width: "9%",
                            margin: "0 1%",
                            padding: "0"
                        }}
                    >
                        <img
                            src={stampInfo.sets[0][0].image}
                            alt=""
                            style={{
                                display: "block",
                                width: "100%"
                            }}
                        />
                    </Button>
                </StampTooltip>
                

                <Button
                    style={{
                        display: "inline-block",
                        width: "9%",
                        margin: "0 1%",
                        padding: "0"
                    }}
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTio_cKMNB3xqhKjEZcn-9Kq92Qh_j1-HLipy1GPti6NECcorxAs1lDt9HepkQ7qiVvcEI&usqp=CAU"
                        alt=""
                        style={{
                            display: "inline-block",
                            width: "100%",
                            filter: "brightness(50%)"
                        }}
                    />
                </Button>
            </div>


            <div style={{display: "inline-block", width: "100vw", marginTop: "1.5vw"}}>
                <img
                    src="https://i.colnect.net/f/122/883/Escapement-Remontoire-and-Fusée.jpg"
                    alt=""
                    style={{
                        width: "9%",
                        margin: "0 1%",
                        filter: "brightness(50%)"
                    }}
                />
                <img
                    src="https://d2j6dbq0eux0bg.cloudfront.net/images/5904137/1429778373.jpg"
                    alt=""
                    style={{
                        width: "9%",
                        margin: "0 1%",
                        filter: "brightness(50%)"
                    }}
                />
                <img
                    src="https://i.pinimg.com/236x/6a/36/07/6a3607fa9a02709a7b31e00f0beae0b1--uk-stamps-postage-stamps.jpg"
                    alt=""
                    style={{
                        width: "9%",
                        margin: "0 1%"
                    }}
                />
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTio_cKMNB3xqhKjEZcn-9Kq92Qh_j1-HLipy1GPti6NECcorxAs1lDt9HepkQ7qiVvcEI&usqp=CAU"
                    alt=""
                    style={{
                        width: "9%",
                        margin: "0 1%",
                        filter: "brightness(50%)"
                    }}
                />
            </div>

        </>
    )
}

export default Catalog;
