import { React } from "react";
import { TableRow, TableCell } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../assets/theme.js";

function HeaderRow({ values }) {
  return (
    <ThemeProvider theme={theme}>
      <TableRow>
        <TableCell style={{ width: "15%" }}>{values.name}</TableCell>
        <TableCell style={{ width: "6%" }}>{values.date}</TableCell>
        <TableCell style={{ width: "6%" }}>{values.value}</TableCell>
        <TableCell style={{ width: "15%" }}>{values.description}</TableCell>
        <TableCell style={{ width: "15%" }}>{values.image}</TableCell>
        <TableCell style={{ width: "6%" }}>{values.owned}</TableCell>
        <TableCell style={{ width: "6%" }}>{values.height}</TableCell>
        <TableCell style={{ width: "15%" }}>{values.setName}</TableCell>
        <TableCell style={{ width: "10%" }}>{values.tags}</TableCell>
        <TableCell style={{ width: "6%" }}>{values.edit}</TableCell>
      </TableRow>
    </ThemeProvider>
  );
}

export default HeaderRow;