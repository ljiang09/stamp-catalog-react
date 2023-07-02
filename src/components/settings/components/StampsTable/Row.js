import { React, useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles.js";
import theme from "../../../../assets/theme.js";

function Row({ values, setName }) {
  const [editing, setEditing] = useState(false);
  const classes = useStyles();

  const [tester, setTester] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell style={{ width: "15%" }}>
          {values.name ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              values.name
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "9%" }}>
          {values.date ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              values.date
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {values.value ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              values.value
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "15%" }}>
          {values.description ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              values.description
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "15%" }}>
          {/* TODO: add editable image dialog */}
          {values.image ? (
            <img src={values.image} alt="stamp" style={{ width: "100%" }} />
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {values.owned ? (
            <Checkbox disabled={!editing} checked />
          ) : (
            <Checkbox disabled={!editing} />
          )}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {values.height ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              values.height
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "12%" }}>
          {setName ? (
            editing ? (
              <TextField
              //   value={tester} onChange={handleChange} label={label}
              />
            ) : (
              setName
            )
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell style={{ width: "10%" }}>
          {/* TODO: add editable image dialog */}
          {values.tags ? values.tags : "No tags"}
        </TableCell>
        <TableCell style={{ width: "6%" }}>
          {values.edit} {/* TODO: change icon while editing */}
        </TableCell>
      </TableRow>
    </ThemeProvider>
  );
}

export default Row;
