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
    return http("/api/index/index?site_id=2", {
      method: "get",
    });
  }
  indexAd(cid) {
    // 广告
    return http("/api/index/ad?site_id=2&cid=" + cid, {
      method: "get",
    });
  }
  category() {
    // 视频分类
    return http("/api/index/category", {
      method: "get",
    }); 
  }
  category_video(cid, page) {
    // 分类视频列表接口 
    return http(`/api/index/category_video?cid=${cid}&page=${page}&limit=20`, {
      method: "get",
    });
  }
  search_video(search_content, page) {
    // 搜索视频接口 
    return http(`/api/index/search_video?search_content=${search_content}&page=${page}&limit=20`, {
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
