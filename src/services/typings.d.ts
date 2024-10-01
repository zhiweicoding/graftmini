// @ts-ignore
/* eslint-disable */

declare namespace Params {

  /**
   * SUCCESS(200, "成功"),
   * BAD_REQUEST(400, "请求参数错误"),
   * EMPTY(406, "数据为空"),
   * FORBIDDEN(403, "没有该操作权限"),
   * NOT_FOUND(404, "请求未找到"),
   * METHOD_NOT_ALLOWED(405, "请求方法不正确"),
   * LOCKED(423, "请求失败，请稍后重试"),
   * TOO_MANY_REQUESTS(429, "请求过于频繁，请稍后重试"),
   * INTERNAL_SERVER_ERROR(500, "系统异常"),
   * ERROR_CONFIGURATION(502, "错误的配置项"),
   * UNKNOWN(999, "未知错误"),
   * UNAUTHORIZED(401, "账号未登录");
   */
  interface BaseResult<T> {
    msg: string;
    code: number;
    data: T;
    size: number;
    empty?: boolean;
  }

  type GoodItem = {
    goodId?: string;
    goodTitle?: string;
    goodBrief?: string;
    scenePicUrl?: string;
    listPicUrl?: string;
    retailPrice?: number;
    goodNumber?: number;
    photoUrl?: string;
    photoUrlArray?: string[];
    symbolId?: string;
    symbolName?: string;
    isChosen?: number;
    isNew?: number;
    likeNum?: number;
    createTime?: number;
    modifyTime?: number;
    isDelete?: number;
  };

  type WxParam = {
    code?: string;
  }

  type WxResponse = {
    openid?: string;
    unionid?: string;
  }

  type FootprintEntity = {
    id?: string;
    goodId?: string;
    createTime?: number;
    url?: string;
    goodTitle?: string;
    goodBrief?: string;
  }

  type AdviceParam = {
    msg?: string;
  }

  type MixParam = {
    url?: string;
  }

  type MixResponse = {
    videoUrl?: string[];
    coverUrl?: string;
    title?: string;
    desc?: string;
    type?: number;
    from?: string;
    imageUrls?: string[];
    empty: boolean;
    mid: string;
    author?: string;
  }

  type MixDisplay = {
    urlArray: DisplayItem[];
    content: string;
    type: number;
    from: string;
    empty: boolean;
    mid: string;
    author?: string;
  }

  type DisplayItem = {
    isVideo: boolean;
    cover: string,
    url: string
  }

  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT';
}
