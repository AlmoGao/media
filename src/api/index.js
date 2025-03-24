import http from "./request";

class HttpService {
  login(data) {
    // 登录
    return http("/api/user/login", {
      method: "post",
      data,
    });
  }
  register(data) {
    // 注册
    return http("/api/user/register", {
      method: "post",
      data,
    });
  }
  index() {
    // 首页
    return http("/api/index/index", {
      method: "get",
    });
  }
  userConfig() {
    // 获取个人信息
    return http("/api/user/index", {
      method: "get",
    });
  }
  logout(data) {
    // 退出登录
    return http("/api/user/logout", {
      method: "post",
      data,
    });
  }
  changepwd(data) {
    // 修改密码
    return http("/api/user/changepwd", {
      method: "post",
      data,
    });
  }
  changefundpwd(data) {
    // 修改资金密码
    return http("/api/user/changefundpwd", {
      method: "post",
      data,
    });
  }
  recharge(data) {
    // 充值
    return http("/api/recharge/recharge?amount=" + data.amount, {
      method: "get",
    });
  }
  band_bank(data) {
    // 绑定银行卡
    return http("/api/user/band_bank", {
      method: "post",
      data,
    });
  }
  withdraw(data) {
    // 提现
    return http(`/api/withdraw/withdraw?amount=${data.amount}&fund_password=${data.fund_password}&image=${data.image}`, {
      method: "get",
    });
  }
  withdraw_list(data) {
    // 提现记录
    return http(`/api/withdraw/withdraw_list?page=${data.page}`, {
      method: "get",
    });
  }
  recharge_list(data) {
    // 充值记录
    return http(`/api/recharge/recharge_list?page=${data.page}`, {
      method: "get",
    });
  }
  user_money_log(data) {
    // 账变记录
    return http(`/api/index/user_money_log?page=${data.page}`, {
      method: "get",
    });
  }
  betting_list(data) {
    // 订单记录
    return http(`/api/game/betting_list?page=${data.page}&status=${data.status}`, {
      method: "get",
    });
  }
  report(data) {
    // 报告
    return http(`/api/index/report?start_time=${data.start_time}&end_time=${data.end_time}`, {
      method: "get",
    });
  }
  betting(data) {
    // 投注
    return http(`/api/game/betting`, {
      method: "post",
      data
    });
  }
  bank_list(data) {
    // 银行列表
    return http("/api/user/bank_list", {
      method: "get",
      data,
    });
  }
  gameType(data) {
    // 游戏类型
    return http("/api/game/type", {
      method: "get",
      data,
    });
  }
  result_list(data) {
    // 开奖记录
    return http(`/api/game/result_list?game_type_id=${data.game_type_id}&page=${data.page}`, {
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
