import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialogGrid: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  uploadBtn: {
    height: "40px",
    width: "200px",
  },
  imgDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  imgPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
    background: "lightgray",
  },
  imgPlaceholderIcon: {
    fontSize: "50px !important",
    color: "gray",
  },
  text: { color: "gray" },
  imgDialogButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    "& button": {
      width: "95px",
    },
  },
});

export default useStyles;
