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
    <TableContainer component={Paper} style={{ width: "70%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Stamp Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Owned</TableCell>
            <TableCell>Set Name (N/A if single)</TableCell>
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
                  <TableCell>{obj.height ? obj.height : "N/A"}</TableCell>
                  <TableCell>idk how to show img</TableCell>{" "}
                  <TableCell>{obj.owned ? "true" : "false"}</TableCell>
                  <TableCell>
                    {value.setName ? value.setName : "N/A, or single"}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => console.log("editing")}>Edit</Button>
                  </TableCell>
                </TableRow>
              ));
            })}
          {/* TODO: add map function here */}

          {/* TODO: map the singles too */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StampsTable;
