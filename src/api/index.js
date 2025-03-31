import http from "./request";

class HttpService {
  login(data) {
    // 登录
    return http("/api/user/login", {
      method: "post",
      data,
    });
  }
  index() {
    // 首页
    return http("/api/index/index?site_id=1", {
      method: "get",
    });
  }
  indexAd() {
    // 广告
    return http("/api/index/ad?site_id=1&cid=", {
      method: "get",
    });
  }
  category() {
    // 视频分类
    return http("/api/index/category", {
      method: "get",
    });
  }
  category_video(cid, page, limit) {
    // 分类视频列表接口 
    return http(`/api/index/category_video?cid=${cid}&page=${page}&limit=${limit}`, {
      method: "get",
    });
  }
  search_video(cid, page, limit) {
    // 搜索视频接口 
    return http(`/api/index/search_video?cid=${cid}&page=${page}&limit=${limit}`, {
      method: "get",
    });
  }


  
  upload(data) {
    // 上传
    return http("/api/common/upload", {
      method: "post",
      data,
      'Content-Type': 'multipart/form-data'
    });
  }
}

const https = new HttpService();
export default https;
