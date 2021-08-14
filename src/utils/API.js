import axios from "axios";
import { history } from "variables/general";

let CMSPrefix = "https://s3-us-west-1.amazonaws.com/fxguardcms.com/";
// let AuthPrefix = "dev-fx-auth-server/oauth/token";

//axios.defaults.headers.common['Authorization'] = `Basic ZnhlbmdpbmU6cGFzc3dvcmQ=`

let CMS = axios.create({
  //baseURL: CMSPrefix,
  responseType: "json",
});

let API = axios.create({
  //baseURL: AuthPrefix,
  responseType: "json",
});

API.interceptors.response.use(
  (response) => {
    console.log("axios interceptor res", response);
    // sessionStorage.setItem("isLoggedOutForcefully",true)
    // window.open(window.origin,"_self")
    // history.push('/home')
    return response;
  },
  (error) => {
    console.log("axios interceptor error", error);
    if (error.response.status === 503) {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("isLoggedOutForcefully", true);
      // window.open(window.origin,"_self")
      history.push("/home");
    }
    return error;
  }
);

export { CMS, CMSPrefix, API };
