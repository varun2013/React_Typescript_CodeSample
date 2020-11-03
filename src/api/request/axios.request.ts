import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Response } from "../model/request";
import { config as defaultConfig } from '../config/api.config';

export const request = async (config: AxiosRequestConfig): Promise<Response> => {
  let response: AxiosResponse;

  config = {
    ...defaultConfig,
    ...config
  };

  try {
    response = await axios.request(config);
  } catch (error) {
    return createResponseFromAxiosError(error);
  }

  return createResponseFromAxiosResponse(response);
};

function createResponseFromAxiosError(error: AxiosError) {
  // handle  error
  let status, message, data;

  if (error.response) {
    status = error.response.status;
    message = error.message;
    data = error.response.data;

  } else if (error.request) {
    status = 0;
    message = error.message;

  } else {
    status = -1;
    message = error.message;
  }

  return { success: false, data, error: { status, message } } as Response;
}

function createResponseFromAxiosResponse(response: AxiosResponse): Response {
  return { success: true, data: response.data } as Response;
}
