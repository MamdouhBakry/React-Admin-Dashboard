const baseUrl = "https://flipkart-rest-api.herokuapp.com/api";
// window.location.hostname === "localhost"
//   ? "http://localhost:5000"
//   : "https://flipkart-rest-api.herokuapp.com/api/";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
