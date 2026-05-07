import axios from "axios";

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Unable to reach the server. Check your internet connection or try again later.";
    }

    const responseMessage = (error.response.data as { message?: string })
      ?.message;
    if (responseMessage) {
      return responseMessage;
    }

    if (error.response.status >= 500) {
      return "The server encountered an error. Please try again shortly.";
    }

    return `Request failed with status ${error.response.status}.`;
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
};
