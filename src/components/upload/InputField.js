import { TextField, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
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
  },
  tooltip: {
    width: "100px",
  },
  iconBtn: {
    width: "20px",
    height: "20px",
  },
});

// TODO: make the textfield outlined in red with an error message below if errorHandler changes
const InputField = ({ value, handleChange, label, info, error, errorMsg }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        size="small"
        value={value}
        onChange={handleChange}
        label={label}
        helperText={errorMsg}
        variant="outlined"
        className={error && classes.error}
        style={{ width: "200px" }}
        sx={{ mr: 1 }}
      />
      {/* <Tooltip title={info} arrow placement="right" className={classes.tooltip}>
                <IconButton className={classes.iconBtn}>
                    <InfoIcon />
                </IconButton>
            </Tooltip> */}
    </div>
  );
};

export default InputField;
