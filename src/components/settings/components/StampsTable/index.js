import { React, useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import HeaderRow from "./HeaderRow";
import Row from "./Row";
import { retrieveCatalog, retrieveTags } from "../../../../server/Firebase.js";
import useStyles from "./styles.js";
import theme from "../../../../assets/theme.js";

function StampsTable() {
  const [stampInfo, setStampInfo] = useState({});
  const [tags, setTags] = useState([]);

  const classes = useStyles();

  // this is duplicate code. move this to init eventually
  useEffect(() => {
    retrieveCatalog(setStampInfo);
    retrieveTags((value) => {
      setTags(value);
    });
  }, []);

  const headerValues = {
    name: "Stamp Name",
    date: "Date",
    value: "Value",
    description: "Description",
    image: "Image",
    owned: "Owned",
    height: "Height",
    setName: "Set Name",
    tags: "Tags",
    edit: "Edit",
  };

  // TODO: create updating functions in firebase

  // TODO: figure out if this should better be in tree format
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table style={{ tableLayout: "fixed" }} aria-label="table">
          <TableHead>
            <HeaderRow values={headerValues} />
          </TableHead>
          <TableBody>
            {stampInfo.hasOwnProperty("sets") &&
              Object.entries(stampInfo.sets).map(([key, value]) => {
                return value.stamps.map((obj) => (
                  <Row values={obj} setName={value.setName} key={key} />
                  //   <TableRow key={key}>
                  //     <TableCell>
                  //       {obj.description ? obj.description : "N/A"}
                  //     </TableCell>
                  //     <TableCell>{obj.date ? obj.date : "N/A"}</TableCell>
                  //     <TableCell>{obj.value ? obj.value : "N/A"}</TableCell>
                  //     <TableCell>Description here</TableCell>
                  //     <TableCell>idk how to show img</TableCell>{" "}
                  //     <TableCell>{obj.owned ? "true" : "false"}</TableCell>
                  //     <TableCell>{obj.height ? obj.height : "N/A"}</TableCell>
                  //     <TableCell>
                  //       {value.setName ? value.setName : "Unknown"}
                  //     </TableCell>
                  //     <TableCell>
                  //       <Button onClick={() => console.log("editing")}>
                  //         Edit
                  //       </Button>
                  //     </TableCell>
                  //   </TableRow>
                ));
              })}
            {/* {stampInfo.hasOwnProperty("singles") &&
              Object.entries(stampInfo.singles).map(([key, value]) => (
                <Row values={value} key={key} />
                // <TableRow key={key}>
                //   <TableCell>{value.name ? value.name : "N/A"}</TableCell>
                //   <TableCell>{value.date ? value.date : "N/A"}</TableCell>
                //   <TableCell>{value.value ? value.value : "N/A"}</TableCell>
                //   <TableCell>
                //     {value.description ? value.description : "N/A"}
                //   </TableCell>
                //   <TableCell>{value.height ? value.height : "N/A"}</TableCell>
                //   <TableCell>idk how to show img</TableCell>{" "}
                //   <TableCell>{value.owned ? "true" : "false"}</TableCell>
                //   <TableCell>N/A, single</TableCell>
                //   <TableCell>
                //     <Button onClick={() => console.log("editing")}>Edit</Button>
                //   </TableCell>
                // </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default StampsTable;
