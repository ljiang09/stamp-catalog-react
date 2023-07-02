import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  stampBtn: {
    display: "inline-block",
    height: (props) => (props.height ? `${props.height / 3}vw` : "150px"),
    margin: "0.85vw 1vw !important",
    padding: "0",
  },
  stampImg: {
    display: "inline-block",
    height: "100%",
    filter: (props) => (props.owned ? "none" : "brightness(50%)"),
  },
  stampDescription: { fontSize: "1.25vw", padding: "0 0.5vw" },
  tooltipInfo: { fontSize: "1vw", padding: "0 0.5vw" },
  tagsSection: {
    maxWidth: "14vw",
    padding: "1vw 0.5vw",
    overflowX: "scroll",
    whiteSpace: "nowrap",
  },
  tags: {
    fontSize: "1vw",
    background: "black",
    padding: "0.4vw 0.75vw",
    borderRadius: "5vw",
    marginRight: "0.5vw",
  },
});

export default useStyles;
