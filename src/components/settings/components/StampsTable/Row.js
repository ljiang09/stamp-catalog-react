import { React } from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles.js";
import theme from "../../../../assets/theme.js";

function Row({ values }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell>{values.name}</TableCell>
        <TableCell>{values.date}</TableCell>
        <TableCell>{values.value}</TableCell>
        <TableCell>{values.description}</TableCell>
        <TableCell>{values.image}</TableCell>
        <TableCell>{values.owned}</TableCell>
        <TableCell>{values.height}</TableCell>
        <TableCell>{values.setName}</TableCell>
        <TableCell>{values.edit}</TableCell>
      </TableRow>
    </ThemeProvider>
  );
}

export default Row;
