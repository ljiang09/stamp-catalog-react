import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15px",
  },
  error: {
    "& label.Mui-focused": {
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
    // TODO: figure out how to make the helper text red
    // "&.MuiFormHelperText-root": {
    //   color: "red",
    // },
  },
  tooltip: {
    width: "100px",
  },
  iconBtn: {
    width: "20px",
    height: "20px",
  },
});

export default useStyles;
