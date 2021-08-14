import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
} from "assets/jss/material-dashboard-react.js";
import modalStyle from "assets/jss/material-dashboard-react/modalStyle.js";

const goldRatesStyle = (theme) => ({
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
  modalContainer: {
    fontWeight: 400,
    maxWidth: 1800,
  },
  walletContainer: {
    backgroundColor: "#EEEAEB",
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
    paddingBottom: "30px !important",
  },
  content: {
    fontWeight: 400,
    fontSize: 16,
  },
  floatLeft: {
    float: "left",
  },
  floatRight: {
    float: "right",
  },
  floatNone: {
    float: "none",
  },
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
  },
  detailsHeader: {
    textAlign: "left",
    marginBottom: 20,
    fontSize: 18,
  },
  detailsRow: {
    marginTop: 10,
    color: "black",
    paddingRight: 15,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailsRowFooter: {
    fontSize: 12,
    textAlign: "left",
  },
  button: {
    marginLeft: 20,
  },
  checkIcon: {
    color: "#A5DC86",
    border: "solid 4px",
    borderRadius: 22,
    padding: 2,
    fontSize: 44,
    borderColor: "aquamarine",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  titleContent: {
    paddingTop: 5,
    paddingLeft: 10,
    position: "absolute",
  },
  loginModalTitle: {
    fontWeight: 600,
    textAlign: "left",
  },
  subTitle: {
    fontWeight: 400,
    fontSize: "16px",
  },
  center: {
    textAlign: "center",
    margin: 20,
    marginTop: 40,
  },
  cardTitle: {
    ...cardTitle,
    marginTop: "0",
    marginBottom: "3px",
    color: grayColor[2],
    fontSize: "18px",
  },
  labelStyle: {
    color: "#AAAAAA !important",
    fontSize: 14,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1.42857,
  },
  cardSubtitle: {
    color: grayColor[0],
    fontSize: 14,
    margin: "0 0 10px",
  },
  textCenter: {
    textAlign: "center",
  },
  justifyContentCenter: {
    justifyContent: "center !important",
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor,
    },
    marginLeft: "5px",
    marginRight: "5px",
  },
  inputAdornment: {
    marginRight: "18px",
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  cardHeader: {
    marginBottom: "20px",
    zIndex: "3",
  },
  socialLine: {
    padding: "0.9375rem 0",
  },
  menuPaper: {
    height: "100px !important",
  },
  menu2Paper: {
    height: "250px !important",
  },
  ...modalStyle(theme),
});

export default goldRatesStyle;
