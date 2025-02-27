export const REGEX = { SUCCESS_CODE: /^2\d{2}$/ };

export const VALIDATION_REGEX = {
  LOGIN_PAGE: {
    PASSWORD_CONDITION: [
      {
        regex: /[A-Z]/,
        message: "Must Consist Uppercase",
      },
      {
        regex: /[a-z]/,
        message: "Must Consist Lowercase",
      },
      {
        regex: /\d/,
        message: "Must Consist Digit",
      },
    ],
  },
};

const CONSTANTS = {
  BACKEND_URL: { CHAT: "http://localhost:8000", ANALYSIS: "http://localhost:5002" },
  SOCKET_URL: "http://localhost:8000",
};

export default CONSTANTS;
