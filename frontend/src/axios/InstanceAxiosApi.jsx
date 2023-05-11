import axios from "axios"

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/`,
})

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/token/refresh`,
      {},
      { withCredentials: true, credentials: "include" }
    )
    const newAccessToken = response.data.accessToken
    sessionStorage.setItem("accessToken", newAccessToken)
    return newAccessToken
  } catch (error) {
    console.error(error)
    window.location = "/"
  }
}

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccessToken = await refreshAccessToken()
      if (newAccessToken) {
        sessionStorage.setItem("accessToken", newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        // Retry the original request with the new access token
        return instance(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)
export default instance
