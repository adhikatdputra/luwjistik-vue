import axios from "axios";

export const tokenHelper = (key) => {
  if (key === false) {
    window.localStorage.removeItem("sessionToken");
    axios.defaults.headers["Authorization"] = "Bearer null";
    return false;
  }
  if (typeof key !== "undefined") {
    window.localStorage.setItem("sessionToken", key);
    axios.defaults.headers["Authorization"] = `Bearer ${tokenHelper()}`;
    return key;
  }
  var v = window.localStorage.getItem("sessionToken");
  if (!v || v === "" || v === "false") {
    axios.defaults.headers["Authorization"] = "Bearer null";
    return false;
  }
  return v;
};
