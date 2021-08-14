/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// @material-ui/icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from '@material-ui/icons/Close';
import Icon from "@material-ui/core/Icon";
import { MenuList } from "./SidebarMenuItems";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
// core components

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const [roleUser, setRoleUser] = useState('role_head_manager');

  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const { color, logo, image, logoText, routes } = props;
  const handleMenuClick = route => {
    history.push(route);
  };
  const handler = children => {
    // const { classes } = props;
    return children.map((subOption) => {
      if (!subOption.role.includes(roleUser)) return null;

      var activePro = " ";
      const listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(subOption.url)
      });
      const whiteFontClasses = classNames({
        [" " + classes.whiteFont]: activeRoute(subOption.url)
      });
      if (!subOption.children) {
        return (
          <MenuItem onClick={() => handleMenuClick(subOption.url)}>{subOption.name}</MenuItem>
        )
      }
      return (
        <SubMenu className={classes.submenu} label={subOption.name}>
          {handler(subOption.children)}
        </SubMenu>
      )
    })
  };  

  return (
    <div>
        <Menu className={classes.mainMenu} menuButton={({ open }) =>
            <MenuButton className={classes.menuButton}>{open ? <CloseIcon /> : <MenuIcon />}</MenuButton>}>
            {handler(MenuList)}
            {/* <MenuItem>New File</MenuItem>
            <SubMenu className={classes.submenu} label="Open">
                <MenuItem>index.html</MenuItem>
                <MenuItem>example.js</MenuItem>
                <SubMenu className={classes.submenu} label="Styles">
                    <MenuItem>about.css</MenuItem>
                    <MenuItem>home.css</MenuItem>
                    <MenuItem>index.css</MenuItem>
                </SubMenu>
            </SubMenu>
            <MenuItem>Save</MenuItem> */}
        </Menu>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
