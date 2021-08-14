import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import routes from "routes.js";
import Button from "components/CustomButtons/Button.js";
import ListItemText from "@material-ui/core/ListItemText";

import pagesStyle from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

const Pages = (props) => {
  const { classes } = props;

  async function componentDidMount() {}
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    componentDidMount();
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 960) {
      document.body.style.overflow = "unset";
    }
  });

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/home") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/home" to="/home/login" />
    </Switch>
  );

  return (
    <div style={{ width: "99%" }}>
      <GridContainer
        justify="center"
        style={{
          backgroundColor: "#FEFEFE",
          color: "white",
          textAlign: window.innerWidth <= 992 ? "center" : "left",
        }}
      >
        <GridItem>
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          {"LOGIN PAGE"}
        </GridItem>
      </GridContainer>
    </div>
  );
};

const getRoutes = (routes, cms) => {
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(prop.views, cms);
    }
    if (prop.layout === "/home" && !prop.overlay) {
      return (
        <Route
          path={prop.layout + prop.path}
          key={key}
          render={() => (
            <prop.component cms={cms} contentPath={prop.contentPath} />
          )}
        />
      );
    } else {
      return null;
    }
  });
};
const getOverlayRoutes = (routes, cms) => {
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return getOverlayRoutes(prop.views, cms);
    }
    if (prop.layout === "/home" && !!prop.overlay) {
      return (
        <Route
          path={prop.layout + (prop.path === "" ? "landing" : prop.path)}
          key={key}
          // component={prop.component}
          render={(data) => {
            console.log("line257", data);

            if (prop.path === "/signup-page" && data.location.state == null) {
              //|| !data.location.state.notProspectDemoUser)){
              let location = data.location;
              location.state = { notProspectDemoUser: true };
              data.location = location;
              return <prop.component {...data} />;
            }
            return <prop.component {...data} />;
          }}
        />
      );
    } else {
      return null;
    }
  });
};
const getActiveRoute = (routes) => {
  let activeRoute = "Default Brand Text";
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveRoute = getActiveRoute(routes[i].views);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
  }
  return activeRoute;
};

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(pagesStyle)(Pages);
