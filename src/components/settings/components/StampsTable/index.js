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

function StampsTable() {
  // TODO: figure out if this should better be in tree format
  return (
    <TableContainer component={Paper} style={{ width: "70%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Stamp Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Owned</TableCell>
            <TableCell>Set Name (N/A if single)</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TODO: add map function here */}
          <TableRow>
            <TableCell>Stamp Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Owned</TableCell>
            <TableCell>Set Name (N/A if single)</TableCell>
            <TableCell>
              <Button onClick={() => console.log("editing")}>Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StampsTable;
