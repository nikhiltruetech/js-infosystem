import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Business from "@material-ui/icons/Business";
import LocationOn from "@material-ui/icons/LocationOn";
import AddLocation from "@material-ui/icons/AddLocation";

// core components/views for Admin layout
import LoginPage from "views/pages/LoginPage.js";
import ForgotPasswordPage from "views/pages/ForgotPasswordPage.js";
import DashboardPage from "views/pages/Dashboard.js";
import BounceReversal from "views/BounceReversal/BounceReversal";
import BounceReversalMaker from "views/BounceReversal/BounceReversalMaker";

const lmsAppRoutes = [
  {
    path: "/login",
    name: "Login",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: LoginPage,
    layout: "/home",
  },
  {
    path: "/forgot-page",
    name: "Forgot Password",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: ForgotPasswordPage,
    layout: "/home",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: '/bounce-reversal',
    name:'Bounce reversal',
    icon:Dashboard,
    rtlName: "لوحة القيادة",
    component: BounceReversal,
    layout: "/admin",
  },
  {
    path: '/bounce-reversal/maker',
    name:'Bounce reversal Maker',
    icon:Dashboard,
    rtlName: "لوحة القيادة",
    component: BounceReversalMaker,
    layout: "/admin",
  }
];

export default lmsAppRoutes;
