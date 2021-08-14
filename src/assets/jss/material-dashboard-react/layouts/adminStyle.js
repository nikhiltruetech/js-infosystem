import {
  drawerWidth,
  headerHeight,
  footerHeight,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      // width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: `${headerHeight}px`,
    width: "100%",
    //padding: "30px 15px",
    minHeight: "calc(100vh - 160px)",
  },
  container,
  map: {
    marginTop: `${headerHeight}px)`,
  },
});

export default appStyle;
