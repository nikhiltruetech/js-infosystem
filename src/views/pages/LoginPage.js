import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import companyLogo from "assets/img/logoifl.png";

// // core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useStateValue } from "../../utils/Utils";
import NoticeModal from "../components/NoticeModal";
import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.js";
import { formatErrString } from "../../utils/Utils";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [userNameErrorMsg] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordErrorMsg] = useState([]);
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalErrMsg, setNoticeModalErrMsg] = useState("");
  const [noticeModalHeaderMsg, setNoticeModalHeaderMsg] = useState("");

  const history = useHistory();

  const { classes } = props;
  const [{ authenticated }, dispatch] = useStateValue(false);

  const closeNoticeModal = () => {
    setNoticeModal(false);
    setNoticeModalErrMsg("");
    setNoticeModalHeaderMsg("");
  };
  const handleLoginSubmit = async () => {
    dispatch({
      type: "changeAuthenticated",
      authenticated: true,
    });
    history.push("/admin/dashboard");
    // if (isValidated()) {
    //   setNoticeModal(false);
    //   setNoticeModalErrMsg("");
    //   setNoticeModalHeaderMsg("");

    //   const data = {
    //     username: userName,
    //     password: password,
    //   };

    //   axios({
    //     method: "post",
    //     url: "loan-service/public/v1/user/login",
    //     data: data,
    //   }).then((response) => {
    //     if (response.data.error_code) {
    //       let errMessage = JSON.parse(
    //         formatErrString(response.data.user_description)
    //       );
    //       setNoticeModalHeaderMsg(errMessage.error);
    //       setNoticeModalErrMsg(errMessage.error_description);
    //       setNoticeModal(true);
    //     } else {
    //       sessionStorage.setItem("token", response.data.access_token);
    //       sessionStorage.setItem("role", response.data.role);
    //       sessionStorage.setItem(
    //         "email",
    //         response.data.email ? response.data.email : ""
    //       );
    //       sessionStorage.setItem(
    //         "name",
    //         response.data.name ? response.data.name : ""
    //       );
    //       sessionStorage.setItem("tokenTime", Date.now());
    //       sessionStorage.setItem("refresh_token", response.data.refresh_token);
    //       dispatch({
    //         type: "changeAuthenticated",
    //         authenticated: true,
    //       });
    //       history.push("/admin/dashboard");
    //     }
    //   });
    // }
  };

  const change = (event, stateName, validState) => {
    stateName(event.target.value);
    if (event.target.value !== "") {
      validState && validState("success");
    } else {
      validState && validState("error");
    }
  };

  const isValidated = () => {
    //validate("", "userName", this.state, rules, this.error)
    if (userName === "") setUserNameState("error");
    if (password === "") setPasswordState("error");
    if (userNameState === "success" && passwordState === "success") {
      return true;
    } else {
      if (userNameState !== "success") {
        setUserNameState("error");
      }
      if (passwordState !== "success") {
        setPasswordState("error");
      }
    }
    return false;
  };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <Card style={{ padding: 20 }}>
            <img
              src={companyLogo}
              alt="Logo"
              width="100"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <CardBody>
              <form>
                <CustomInput
                  success={userNameState === "success"}
                  error={userNameState === "error"}
                  helpText={userNameState === "error" && userNameErrorMsg[0]}
                  labelText="User Name"
                  id="lp_userName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      change(event, setUserName, setUserNameState);
                    },
                    endAdornment: (
                      <InputAdornment position="start">
                        {/* <Email className={classes.inputAdornmentIcon} /> */}
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  success={passwordState === "success"}
                  error={passwordState === "error"}
                  helpText={passwordState === "error" && passwordErrorMsg[0]}
                  labelText="Password"
                  id="lp_password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      change(event, setPassword, setPasswordState);
                    },
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="start">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </CardBody>
            {/* <CardFooter stats> */}
            <div
              className={classes.center}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                round={false}
                color="info"
                onClick={() => handleLoginSubmit()}
              >
                Submit
              </Button>
            </div>
            <div style={{ textAlign: "center" }}>
              <NavLink to={"/home/forgot-page"}>
                <p>Forgot Password?</p>
              </NavLink>
            </div>
            {/* </CardFooter> */}
          </Card>
        </GridItem>
      </GridContainer>
      <NoticeModal
        noticeModal={noticeModal}
        noticeModalHeader={noticeModalHeaderMsg}
        noticeModalErrMsg={noticeModalErrMsg}
        closeModal={closeNoticeModal}
      />
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginPageStyle)(LoginPage);
