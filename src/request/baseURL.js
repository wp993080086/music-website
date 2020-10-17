const url = process.env.VUE_APP_URL;

const baseURL =
    process.env.NODE_ENV === "production" ?
    url
    //  ?"http://192.168.24.220:8080"
    //  ?"http://192.168.24.121:8080"
    // :"/api"
    :
    url
    // : "http://192.168.24.220:8080";
    // : "http://192.168.24.121:8080";
    // : "/api";

export default baseURL;