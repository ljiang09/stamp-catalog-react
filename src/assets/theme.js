import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableCell: {
      variants: [
        {
          props: { component: "th" },
          style: {
            border: "solid 1px gray",
            fontSize: "16px",
            fontWeight: "bold",
            paddingLeft: 0,
            paddingRight: 0,
            textAlign: "center",
          },
        },
        {
          props: { component: "td" },
          style: {
            border: "solid 1px gray",
            fontSize: "14px",
            textAlign: "center",
          },
        },
      ],
    },
  },
});

export default theme;
