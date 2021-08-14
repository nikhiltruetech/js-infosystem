import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Sidebar from "../Sidebar/Sidebar";
import Button from "components/CustomButtons/Button.js";

//hooks
import { useRouteName } from "hooks";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const routeName = useRouteName();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <div className={classes.inline}>
            {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton> */}
            <Sidebar />
            {/* <Menu className={classes.mainMenu} menuButton={({ open }) =>
              <MenuButton className={classes.menuButton}>{open ? <CloseIcon /> : <MenuIcon />}</MenuButton>}>
              <MenuItem>New File</MenuItem>
              <SubMenu className={classes.submenu} label="Open">
                  <MenuItem>index.html</MenuItem>
                  <MenuItem>example.js</MenuItem>
                  <SubMenu className={classes.submenu} label="Styles">
                      <MenuItem>about.css</MenuItem>
                      <MenuItem>home.css</MenuItem>
                      <MenuItem>index.css</MenuItem>
                  </SubMenu>
              </SubMenu>
              <MenuItem>Save</MenuItem>
          </Menu> */}
          </div>
          {/* Here we create navbar brand, based on route name */}
          <div className={classes.inline}>
            <Button color="transparent" href="#" className={classes.title}>
              {routeName}
            </Button>
          </div>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            {/* <Menu /> */}
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
