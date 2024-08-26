// @ts-ignore
/* eslint-disable */

declare namespace Params {

  interface BaseResult<T> {
    msgInfo: string;
    msgCode: number; // 1000 success, 10001 fail, 1002 no auth
    msgBody: T;
    msgBodySize: number;
    isEmpty?: boolean;
  }

  type BannerListItem = {
    id?: string;
    link?: string;
    imageUrl?: string;
  };

  type SymbolListItem = {
    symbolId?: string;
    symbolName?: string;
    sortNum?: number;
    isPopular?: number;
    place?: number;
    createTime?: number;
    modifyTime?: number;
    checked?: boolean;
  };

  type StoreListItem = {
    storeId?: string;
    storeName?: string;
    storeDesc?: string;
    storeLogo?: string;
    phoneNum?: string;
    backupPhoneNum?: string;
    staffWx?: string;
    address?: string;
    goodNumber?: string;
    lnglat?: string;
    licenseUrl?: string;
    createTime?: number;
    modifyTime?: number;
    isDelete?: number;
  };

  type Banner = {
    id: string;
    link: string;
    imageUrl: string;
  }

  type FloorGood = {
    id: string;
    name: string;
    goodsList: GoodItem[];
  }

  type HomeEntity = {
    hotGoods: GoodItem[];
    newGoods: GoodItem[];
    brands: GoodItem[];
    floorGoods: FloorGood[];
    topics: GoodItem[];
    banners: Banner[];
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

  interface CatalogEntity extends CatalogParam {
    goodsList: GoodItem[];
    symbolName: string;
  }

  interface DefaultKeyword {
    keyword: string;
  }

  interface KeywordBean {
    is_hot: number;
    keyword: string;
    keywordId: string;
  }

  interface SearchRedirectEntity {
    pageUrl?: string;
    keywordId?: string;
  }

  interface SearchEntity {
    helpKeywords: KeywordBean[];
    historyKeyword: KeywordBean[];
    hotKeywords: KeywordBean[];
    defaultKeyword: DefaultKeyword;
  }

  type GoodIdParam = {
    goodId?: string;
  }

  type SearchParam = {
    keyword?: string;
    keywordId?: string;
  }

  type AdviceParam = {
    msg?: string;
  }

  type CatalogParam = {
    isPopular?: number;
    isNew?: number;
    order?: string;
    isChosen?: number;
    symbolId?: string;
    place?: number;
    searchValue?: string;
  }

  type FootprintEntity = {
    id?: string;
    goodId?: string;
    createTime?: number;
    url?: string;
    goodTitle?: string;
    goodBrief?: string;
  }

  type KeywordItem = {
    keyword?: string;
    keywordId?: string;
    isHot?: number;
  }

  type StoreBean = {
    storeId?: string;
    storeName?: string;
    storeDesc?: string;
    storeLogo?: string;
    phoneNum?: string;
    backupPhoneNum?: string;
    staffWx?: string;
    address?: string;
    lnglat?: string;
    licenseUrl?: string;
    isDelete?: number;
    createTime?: number;
    modifyTime?: number;
    distance?: number;
    lng?: number;
    lat?: number;
    checked?: boolean;
  };

  type StoreVo = {
    cityName?: string;
    searchVal?: string;
    storeId?: string;
    lng?: number;
    lat?: number;
  };

  type CitySubItem = {
    name: string;
    lnglat: number[];
  };

  type CityItem = {
    title: string;
    key: string;
    items: CitySubItem[];
  };

  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT';
}
