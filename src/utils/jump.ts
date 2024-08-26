import Taro from '@tarojs/taro';

const PAGE_WEBVIEW = '/pages/webview/webview';

interface JumpOptions {
  url: string;
  title?: string;
  payload?: Record<string, any>;
  method?: 'navigateTo' | 'redirectTo' | 'switchTab'; // 根据 Taro 的实际 API 调整
}

export default function jump(options: JumpOptions): void {
  const {url, title = '', payload = {}, method = 'navigateTo'} = options;

  if (/^https?:\/\//.test(url)) {
    Taro[method]({
      url: urlStringify(PAGE_WEBVIEW, {url, title})
    });
  } else if (/^\/pages\//.test(url)) {
    if (process.env.TARO_ENV === 'h5' && method === 'switchTab') {
      Taro.navigateBack({delta: Taro.getCurrentPages().length - 1});
      setTimeout(() => {
        Taro.redirectTo({url});
      }, 100);
      return;
    }

    Taro[method]({
      url: urlStringify(url, payload)
    });
  }
}

function urlStringify(url: string, payload: Record<string, any>, encode: boolean = true): string {
  const arr = Object.keys(payload).map(key =>
    `${key}=${encode ? encodeURIComponent(payload[key]) : payload[key]}`
  );

  return arr.length ? `${url}?${arr.join('&')}` : url;
}
