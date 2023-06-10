import { React } from "react";
import { useParams } from 'react-router-dom';
import { stampInfoDetailed } from "../catalog/StampData"


function StampInfo() {
    // the displayed page will either have info for just the single stamp, or if in a set, the entire set. so this ID will represent either of those
    const { id } = useParams();

    const info = stampInfoDetailed[id];

    return (
        <div style={{width: "50vw", margin: "0 25vw"}}>
            <h2>{info.name}</h2>
            <p>Adhesion type: {info.adhesion}</p>
            <p>Country: {info.country}</p>
            <p>{info.description}</p>
        </div>
    )
}

export default StampInfo;
