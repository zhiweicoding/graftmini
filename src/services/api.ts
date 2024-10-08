import Taro from '@tarojs/taro';
import util from "../utils/util";

// const apiUrl: string = "http://localhost:8082/proxy/";
const apiUrl: string = "https://finance.zhiwei.plus/mix/graft";

const API = {
  parse: apiUrl + "/api/mix/parse",
  getIdByCode: apiUrl + "/api/user/getIdByCode",
  queryById: apiUrl + "/api/mix/byId/",
  list: apiUrl + "/api/mix/list/",
  AdviceSave: apiUrl + "/v1/api/advice/save",
};

// 拦截器函数
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const {method, data} = requestParams
  // let openid = Taro.getStorageSync('openid')
  // if (!openid && openid.length <= 0) {
  //   openid = 'anonymous'
  // }
  let openid = 'anonymous';
  if (method === 'POST') {
    requestParams.data = {
      ...data,
      vid: openid,
      openid: openid
    }
  }

  return chain.proceed(requestParams)
    .then(res => {
      return res.data.data;
    })
}

// 添加拦截器
Taro.addInterceptor(interceptor);


export async function queryById(rid: string): Promise<Params.MixResponse> {
  return util.request(
    API.queryById + rid,
    {},
  ).then((res) => {
    return res.data;
  });
}

export async function getIdByCode(wxParam: Params.WxParam): Promise<Params.WxResponse> {
  return util.request(
    API.getIdByCode,
    wxParam,
    "POST",
    'application/json'
  ).then((res) => {
    return res.data;
  });
}


export async function list(vid: string): Promise<Params.MixResponse> {
  return util.request(
    API.list + vid,
  ).then((res) => {
    return res.data;
  });
}


export async function parse(body: Params.MixParam): Promise<Params.MixResponse> {
  return util.request(
    API.parse,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    return res.data;
  });
}

export async function saveAdvice(body: Params.AdviceParam): Promise<boolean> {
  return util.request(
    API.AdviceSave,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    return res.data;
  });
}

