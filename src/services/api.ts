import util from "../utils/util";

// const apiUrl: string = "http://localhost:8082/proxy/";
const apiUrl: string = "https://api.zhiweicoding.xyz/";

const API = {
  HomeUrl: apiUrl + "v1/api/home/query",
  DetailGoodUrl: apiUrl + "v1/api/good/detail",
  SymbolList: apiUrl + "v1/api/symbol/list",
  CatalogList: apiUrl + "v1/api/catalog/query",
  AdviceSave: apiUrl + "v1/api/advice/save",
  StoreList: apiUrl + "v1/api/store/list",
  StoreDetail: apiUrl + "v1/api/store/detail",
  // SearchIndex: apiUrl + "v1/api/search/query",
  // SearchHelper: apiUrl + "v1/api/search/help",
  // SearchResult: apiUrl + "v1/api/search/redirect",
};

export async function queryHome(): Promise<Params.HomeEntity> {
  return util.request(
    API.HomeUrl,
    {},
  ).then((res) => {
    return res.msgBody;
  });
}

export async function queryGoodDetail(body: Params.GoodIdParam): Promise<Params.GoodItem> {
  return util.request(API.DetailGoodUrl, body, 'POST', 'application/json')
    .then((res) => {
      return res.msgBody;
    });
}

export async function queryCatalog(body: Params.CatalogParam): Promise<Params.CatalogEntity> {
  return util.request(
    API.CatalogList,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    return res.msgBody;
  });
}

export async function saveAdvice(body: Params.AdviceParam): Promise<boolean> {
  return util.request(
    API.AdviceSave,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    return res.msgBody;
  });
}

export async function querySymbol(isCatalog: boolean): Promise<Params.SymbolListItem[]> {
  return util.request(
    API.SymbolList,
    {
      isCatalog: isCatalog
    },
  ).then((res) => {
    return res.msgBody;
  });
}

export async function queryStore(body: Params.StoreVo): Promise<Params.StoreBean[]> {
  return util.request(
    API.StoreList,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    return res.msgBody;
  });
}

export async function queryStoreDetail(body: Params.StoreVo): Promise<Params.StoreBean> {
  return util.request(
    API.StoreDetail,
    body,
    "POST",
    'application/json'
  ).then((res) => {
    const msgBody: Params.StoreBean = res.msgBody
    const lnglat: string | any = msgBody.lnglat
    if (lnglat && lnglat.indexOf(',') > 0) {
      const ss: string[] = lnglat.split(',');
      msgBody.lat = parseFloat(ss[0]);
      msgBody.lng = parseFloat(ss[1]);
    }
    return res.msgBody;
  });
}

// export async function search(): Promise<Params.BaseResult<Params.SearchEntity>> {
//   return util.request(API.SearchIndex, {});
// }
//
//
// export async function searchAuto(body: Params.SearchParam): Promise<Params.BaseResult<Params.KeywordBean[]>> {
//   return util.request(API.SearchHelper, body, 'POST', 'application/json');
// }
//
// export async function searchRedirect(body: Params.SearchParam): Promise<Params.BaseResult<Params.SearchRedirectEntity>> {
//   return util.request(API.SearchResult, body, 'POST', 'application/json');
// }
