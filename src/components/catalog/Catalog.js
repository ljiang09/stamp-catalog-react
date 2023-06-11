import {React} from "react";
import {useNavigate} from "react-router-dom"
import BinderImage from "./StampBinder.png";
import StampButton from "./components/StampButton";
import {stampInfo} from "./StampData";

function Catalog() {
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
            <p>Sort by: All (other options: sets, singles, full sets, owned, clocks, christmas, other categories)</p>

            <img src={BinderImage} alt="stamp binder page" style={{
                position: "absolute",
                width: "70%",
                left: "13%",
                zIndex: -10
            }} />

            <div style={{height: "0.5vw"}}></div>

            {Object.entries(stampInfo.sets).map(([key, value]) => (
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "64vw",
                    marginLeft: "18vw"
                }}>
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
