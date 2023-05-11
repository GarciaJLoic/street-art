import axios from "axios"

const instance = axios.create({
  baseURL: `http://localhost:5000/`,
})

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `http://localhost:5000/token/refresh`,
      {},
      { withCredentials: true, credentials: "include" }
    )
    const newAccessToken = response.data.accessToken
    sessionStorage.setItem("accessToken", JSON.stringify(newAccessToken))
  } catch (error) {
    console.error(error)
    window.location = "/"
  }
}
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessToken() // Call the function to refresh the access token
      return instance(originalRequest) // Retry the original request
    }
    // window.location.reload();
    return Promise.reject(error)
  }
)

// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response.status === 401 &&
//             !originalRequest._retry
//         ) {
//             originalRequest._retry = true;
//             try {
//                 const response = await axios.post(
//                     `http://localhost:5000/token/refresh`,
//                     {},
//                     { withCredentials: true, credentials: 'include' }
//                     );
//                     const newAccessToken = response.data.accessToken;
//                 sessionStorage.setItem('accessToken', JSON.stringify(newAccessToken));
//                 window.location.reload()
//             } catch (error) {
//                 console.error(error)
//                 window.location = '/';
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default instance
