import { React, useState, useEffect } from "react";
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
import { retrieveCatalog, retrieveTags } from "../../../../server/Firebase.js";

function StampsTable() {
  const [stampInfo, setStampInfo] = useState({});
  const [tags, setTags] = useState([]);

  // this is duplicate code. move this to init eventually
  useEffect(() => {
    retrieveCatalog(setStampInfo);
    retrieveTags((value) => {
      setTags(value);
    });
  }, []);

  useEffect(() => {
    console.log("stamp info:", stampInfo);
  }, [stampInfo]);
  // TODO: create updating functions in firebase

  // TODO: figure out if this should better be in tree format
  return (
    <TableContainer
      component={Paper}
      style={{ width: "70%", margin: "auto", maxHeight: "70vh" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Stamp Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Owned</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Set Name</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stampInfo.hasOwnProperty("sets") &&
            Object.entries(stampInfo.sets).map(([key, value]) => {
              return value.stamps.map((obj) => (
                <TableRow key={key}>
                  <TableCell>
                    {obj.description ? obj.description : "N/A"}
                  </TableCell>
                  <TableCell>{obj.date ? obj.date : "N/A"}</TableCell>
                  <TableCell>{obj.value ? obj.value : "N/A"}</TableCell>
                  <TableCell>Description here</TableCell>
                  <TableCell>idk how to show img</TableCell>{" "}
                  <TableCell>{obj.owned ? "true" : "false"}</TableCell>
                  <TableCell>{obj.height ? obj.height : "N/A"}</TableCell>
                  <TableCell>
                    {value.setName ? value.setName : "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log("editing")}>Edit</Button>
                  </TableCell>
                </TableRow>
              ));
            })}
          {stampInfo.hasOwnProperty("singles") &&
            Object.entries(stampInfo.singles).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{value.name ? value.name : "N/A"}</TableCell>
                <TableCell>{value.date ? value.date : "N/A"}</TableCell>
                <TableCell>{value.value ? value.value : "N/A"}</TableCell>
                <TableCell>
                  {value.description ? value.description : "N/A"}
                </TableCell>
                <TableCell>{value.height ? value.height : "N/A"}</TableCell>
                <TableCell>idk how to show img</TableCell>{" "}
                <TableCell>{value.owned ? "true" : "false"}</TableCell>
                <TableCell>N/A, single</TableCell>
                <TableCell>
                  <Button onClick={() => console.log("editing")}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StampsTable;
