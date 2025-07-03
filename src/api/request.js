import axios from "axios";
import router from "@/router";
import store from "../store/index";

const whiteList = ["/api/product/orderinfo", "/api/user/message"];
class Interceptors {
  instance;
  constructor() {
    this.instance = axios.create({
      // baseURL: '/',
      baseURL: 'https://seoadmin.top',
      timeout: 20000,
    });
  }
  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = store.state.token;
        if (token) {
          config.headers["token"] = token;
          config.headers["uid"] = store.state.userInfo.id;
        }
        if (config['Content-Type']) {
          config.headers["Content-Type"] = config['Content-Type']
        }
        return config;
      },
      (error) => {
        // useMessage().error(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        const res = response.data;
        // debugger
        if (res.code !== undefined && res.code == 0) {
          if (res.code == 401) {
            store.commit("setToken", "");
            store.commit("setUserInfo", {});
            router.replace("/login");
            return Promise.reject(res);
          } else {
            setTimeout(() => {
              if (!whiteList.includes(response.config.url)) {
                // useMessage().error(error);
              }
            }, 200);
            return Promise.reject(res);
          }
        } else {
          return res.data || res;
        }
      },
      (error) => {
        const newError = error;
        const code = newError.response ? newError.response.status : -1;
        if (code === 401) {
          store.commit("setToken", "");
          store.commit("setUserInfo", {});
          router.replace("/login");
        } else if (newError.message) {
          // useMessage().error(newError.message);
        }
        return Promise.reject(newError);
      }
    );
  }
  // 返回一下
  getInterceptors() {
    return this.instance;
  }
}
const instance = new Interceptors();
instance.init();
export default instance.getInterceptors();
