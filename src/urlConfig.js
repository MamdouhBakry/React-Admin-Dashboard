const baseUrl = "https://flipkart-admin-dashboard-app.herokuapp.com/";
// window.location.hostname === "localhost"
//   ? "http://localhost:5000"
//   : "https://flipkart-admin-dashboard-app.herokuapp.com/";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
