import axios from "axios";

export interface ResponseType {
  status: number;
  statusText: string;
  success: boolean;
  message?: string;
  data?: any[] | object;
}

export const makeRequest = async (config: any) => {
  try {
    const response = await axios(config);
    console.log("Response>>", response.data);
    const resData = response.data;
    return {
      status: resData.status,
      statusText: (resData && resData.statusText) || "",
      success: (resData && resData.success) || false,
      message: (resData && resData.message) || "Custom Message",
      data: (resData && resData.data) || null,
    };
  } catch (error: any) {
    console.log(`Error Response ${error}`);
    // console.log(`Error Response ${JSON.stringify(error)}`);
    if (error && error.response) {
      console.log(
        "Error Response",
        error.response.status,
        error.response.statusText,
        error.response.data.message && error.response.data.message
      );
      const { status, statusText, success } = error.response.data;
      return {
        status,
        statusText,
        success,
        message: error.response.data.message
          ? error.response.data.message
          : "Custom Error",
      };
    }
  }
};
