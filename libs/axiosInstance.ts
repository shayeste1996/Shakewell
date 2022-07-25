import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://riptide.shakewell.net/api/v1/";

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": " GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
    Authorization: `Bearer ${Cookies.get("token-test")}`,
  },
});
