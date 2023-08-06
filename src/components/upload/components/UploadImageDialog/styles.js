import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialogGrid: {
    width: "240px !important",
    height: "400px !important",
  },
  imgToggle: {
    margin: "20px 0",
  },
  imgLinkInput: {
    height: "40px",
    width: "200px",
  },
  imgDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "200px",
    marginTop: "10px",
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
    marginTop: "10px",
  },
  imgPlaceholderIcon: {
    fontSize: "50px !important",
    color: "gray",
  },
  text: { color: "gray" },
  imgDialogButtons: {
    padding: "10px 20px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default useStyles;
