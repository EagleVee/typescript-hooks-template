import axios from "axios";
import * as qs from "query-string";

import {
  API_ENDPOINT,
  REQUEST_TIME_OUT,
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from "../Config/Remote";

const instance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: REQUEST_TIME_OUT,
  headers: {},
});

const checkStatus = (response: any) => {
  console.log("RESPONSE:", response);
  if (response.status === STATUS_OK) {
    return response.data;
  }
  return {};
};

const logError = (error: any) => {
  console.log("ERROR RESPONSE:", error.response);
  console.log("ERROR API:", error);
  if (error.response) {
    const { status, data } = error.response;
    if (status === STATUS_BAD_REQUEST) {
      return data;
    } else if (status === STATUS_UNAUTHORIZED) {
      return data;
    } else if (status === STATUS_INTERNAL_SERVER_ERROR) {
      return {
        data: "Mã lỗi" + status,
        msg: "Mã lỗi" + status,
        code: status,
      };
    }
  }
  return {
    status: false,
    message: "Lỗi server",
    error: error,
  };
};

export const GET = (url: string, config = {}) => {
  return instance
    .get(url, config)
    .then(checkStatus)
    .catch(logError);
};

export const POST = (url: string, params: object, config = {}) => {
  return instance
    .post(url, params, config)
    .then(checkStatus)
    .catch(logError);
};

export const PUT = (url: string, params: object, config = {}) => {
  return instance
    .put(url, params, config)
    .then(checkStatus)
    .catch(logError);
};

export const DELETE = (url: string, config = {}) => {
  return instance
    .delete(url, config)
    .then(checkStatus)
    .catch(logError);
};
