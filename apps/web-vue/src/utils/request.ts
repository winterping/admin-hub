import axios, { InternalAxiosRequestConfig } from "axios";
import { useAccessStore } from "@/store/access";
import { clearToken, clearUserInfo } from "./clear-store";
import { router } from '@/router'
import { ElMessage } from "element-plus";
const accessStore = useAccessStore();


const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessStore.accessToken) {
      // console.log("accessStore", accessStore.accessToken);
      config.headers.Authorization = `Bearer ${accessStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log("请求成功返回", response.data);
    const { code } = response.data;
    if (code === 200) {
      return response.data;
    }
  },
  (error) => {
    console.log("报错", error.response.data);
    if (error.response && error.response.data) {
      const msg = error.response.data.message;
      if (Array.isArray(msg)) {
        msg.forEach((item) => {
          ElMessage.error(item);
        });
      } else {
        ElMessage.error(msg);
      }
      if (error.response.data.code === 11002) {
        console.log("110002");
        clearToken();
        clearUserInfo();
        router.replace({
          path: '/login',
        })
        return;
      }

      return Promise.reject(error.response.data);
    }
  },
);

export default request;
