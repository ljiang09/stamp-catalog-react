import { TextField, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useStyles from "./styles";

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
