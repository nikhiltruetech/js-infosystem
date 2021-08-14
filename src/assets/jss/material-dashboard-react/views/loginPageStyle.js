import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
} from "assets/jss/material-dashboard-react.js";
//   import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

const loginPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  loginMaxWidth: {
    maxWidth: 380,
  },
});

export default loginPageStyle;
