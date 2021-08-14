import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Slide from "@material-ui/core/Slide";
import cx from "classnames";
import axios from "axios";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import NoticeModal from "../components/NoticeModal";
import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.js";
import companyLogo from "assets/img/logoifl.png";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const ForgotPasswordPage = (props) => {
  // we use this to make the card to appear after the page has been rendered
  const [forgotPasswordModal, setForgotPasswordModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [userNameErrorMsg] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [isUserNameVerified, setUserNameVerified] = useState(false);
  const [otpCode, setOTPCode] = useState("");
  const [otpCodeState, setOTPCodeState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [modalClose, setModalClose] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);
  const [noticeModalErrMsg, setNoticeModalErrMsg] = useState("");
  const [noticeModalHeaderMsg, setNoticeModalHeaderMsg] = useState("");

  const { classes } = props;
  let history = useHistory();

  const handleClose = (modal) => {
    modal(false);
    history.go(-1);
  };

  const onSubmitClick = () => {
    if (isUserNameVerified) handleResetPasswordSubmit();
    else generateOTP();
  };

  const generateOTP = async () => {
    const data = {
      username: userName,
      userType: selectedRole,
    };
    axios({
      method: "post",
      url: "auth/v1/oauth/user/forgetPassword",
      data: data,
    }).then((response) => {
      if (response.data.error_code) {
        setNoticeModalErrMsg("Please provide the valid User name & Role");
        setNoticeModalHeaderMsg("Error");
        setNoticeModal(true);
      } else {
        setUserNameVerified(true);
      }
    });
  };

  const handleResetPasswordSubmit = async () => {
    const data = {
      username: userName,
      userType: selectedRole,
      password: password,
      otp: otpCode,
    };
    axios({
      method: "post",
      url: "auth/v1/oauth/user/changePassword",
      data: data,
    }).then((response) => {
      // console.log(response);
      if (response.data.error_code) {
        setNoticeModalErrMsg(
          "Please recheck the User Name, Role and OTP code."
        );
        setNoticeModalHeaderMsg("Error");
        setNoticeModal(true);
      } else {
        setModalClose(true);
        setNoticeModalErrMsg(
          "your password has been successfully reset, and you can login"
        );
        setNoticeModalHeaderMsg("SUCCESS");
        setNoticeModal(true);
      }
    });
  };

  const componentDidUpdate = () => {
    if (!forgotPasswordModal) {
      history.go(-1);
    }
  };

  useEffect(() => {
    componentDidUpdate();
  }, []);

  const change = (event, stateName) => {
    stateName(event.target.value);
  };

  const closeNoticeModal = () => {
    setNoticeModal(false);
    setNoticeModalErrMsg("");
    setNoticeModalErrMsg("");
    if (modalClose) {
      history.go(-1);
    }
  };

  return (
    <div className={cx(classes.container, classes.center)}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={10} md={10}>
          <Card style={{ padding: 20, width: 330 }}>
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
            <h3 className={cx(classes.modalTitle, classes.loginModalTitle)}>
              Reset your Password
            </h3>
            <CardBody>
              <form>
                {isUserNameVerified ? (
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="New Password"
                      id="lp_password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: password,
                        onChange: (event) => {
                          change(event, setPassword, setPasswordState);
                        },
                      }}
                    />
                    <CustomInput
                      labelText="OTP Code"
                      id="lp_otpcode"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: otpCode,
                        onChange: (event) => {
                          change(event, setOTPCode, setOTPCodeState);
                        },
                      }}
                    />
                  </FormControl>
                ) : (
                  <>
                    <FormControl fullWidth>
                      <CustomInput
                        success={userNameState === "success"}
                        error={userNameState === "error"}
                        helpText={
                          userNameState === "error" && userNameErrorMsg[0]
                        }
                        labelText="User Name"
                        id="lp_userName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: userName,
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
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel className={classes.labelStyle}>
                        Role*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={selectedRole}
                        onChange={(event) =>
                          setSelectedRole(event.target.value)
                        }
                      >
                        <MenuItem value={"HEAD_MANAGER"}>Head Manager</MenuItem>
                        <MenuItem value={"BRANCH_MANAGER"}>
                          Branch Manager
                        </MenuItem>
                        <MenuItem value={"AGENT"}>Branch Agent</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
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
                onClick={() => onSubmitClick()}
              >
                {isUserNameVerified ? "Verify" : "Submit"}
              </Button>
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

ForgotPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginPageStyle)(ForgotPasswordPage);
