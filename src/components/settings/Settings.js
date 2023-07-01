import { React } from "react";
import StampsTable from "./components/StampsTable";
import TagsTable from "./components/TagsTable";

function Settings() {
  return (
    <>
      <h2>This is the settings screen</h2>
      <h2>Edit Stamps</h2>
      <StampsTable />
      <h2>Edit Tags</h2>
      <TagsTable />
    </>
  );
}

export default Settings;
