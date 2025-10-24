import axiosInstance from "../api/axiosInstance";

export const signupUser = (data) => axiosInstance.post("/auth/signup", data);
export const loginUser = (data) => axiosInstance.post("/auth/login", data);
export const getUserProfile = () => axiosInstance.get("/auth/me");
