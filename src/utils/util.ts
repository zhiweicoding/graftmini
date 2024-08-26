import Taro from '@tarojs/taro'


export default class Util {

  static formatTime(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${[year, month, day].map(Util.formatNumber).join('/')}` +
      ` ${[hour, minute, second].map(Util.formatNumber).join(':')}`;
  }

  static formatNumber(n: number): string {
    const str = n.toString();
    return str.length > 1 ? str : `0${str}`;
  }

  static getNowFormatDate(): string {
    const date: Date = new Date();
    const seperator1: string = '-';
    const seperator2: string = ':';
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();

    month = month >= 1 && month <= 9 ? `0${month}` : month;
    strDate = strDate >= 0 && strDate <= 9 ? `0${strDate}` : strDate;

    return `${date.getFullYear()}${seperator1}${month}${seperator1}${strDate} ` +
      `${date.getHours()}${seperator2}${date.getMinutes()}${seperator2}${date.getSeconds()}`;
  }

  static getTime(): string {
    return Util.getNowFormatDate();
  }

  static getTimeStr(total: number): string {
    const seconds: number = total % 60;
    const fen: number = Math.floor(total / 60);
    let timeTotalStr: string = '';

    timeTotalStr += (fen < 10 ? `0${fen}` : fen) + ':';
    timeTotalStr += (seconds < 10 ? `0${seconds}` : seconds);

    return timeTotalStr;
  }

  static request(url: string, data: any = {}, method: Params.HttpMethod = 'POST', contentType: string = 'application/x-www-form-urlencoded'): Promise<Params.BaseResult<any>> {
    const userInfo = Taro.getStorageSync('userInfo');
    if (userInfo) {
      data.openId = userInfo.openId;
    }
    if (!data.timestamp) {
      data.timestamp = new Date().getTime();
    }
    data.userType = process.env.TARO_ENV;
    return new Promise((resolve, reject) => {
      Taro.request({
        url: url,
        data: data,
        method: method,
        header: {
          'Content-Type': contentType,
          'Content-token': Taro.getStorageSync('token')
        },
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.code == 10000) {
              //成功
              resolve(res.data)
            } else if (res.data.code == 10001) {
              //失败
              resolve(res.data)
              Taro.showToast({
                title: res.data.msgInfo
              })
            } else {
              console.warn(res.data)
              resolve(res.data)
            }
          } else {
            reject(res.errMsg)
          }
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }

  /**
   * 检查微信会话是否过期
   */
  static checkSession(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Taro.checkSession({
        success: () => {
          resolve(true);
        },
        fail: () => {
          reject(false);
        }
      });
    });
  }

  /**
   * 调用微信登录
   */
  static login(): Promise<any> {
    return new Promise((resolve, reject) => {
      Taro.login({
        success: (res) => {
          if (res.code) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }

  static getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      Taro.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            Taro.getUserInfo({
              success: (res) => {
                console.log(res.userInfo);
                resolve(res);
              },
              fail: (err) => {
                reject(err);
              }
            });
          }
        },
        fail: () => {
          Taro.redirectTo({
            url: '/pages/login/login'
          });
        }
      });
    });
  }

  static redirect(url: string): void {
    Taro.redirectTo({
      url: url
    });
  }

  /**
   * icon?: 'success' | 'error' | 'loading' | 'none'
   * @param msg
   */
  static showErrorToast(msg: string): void {
    Taro.showToast({
      title: msg,
      icon: 'error'
    });
  }

  static showErrorToastLong(msg: string): void {
    Taro.showToast({
      title: msg,
      image: '../img/icon_error.png',
      duration: 2000
    });
  }

  static showSmileToastLong(msg: string): void {
    Taro.showToast({
      title: msg,
      icon: 'none',
      duration: 3000
    });
  }

  static getDateDiff(startDate: string, endDate: string): number {
    const startTime = new Date(Date.parse(startDate.replace(/-/g, '/'))).getTime();
    const endTime = new Date(Date.parse(endDate.replace(/-/g, '/'))).getTime();
    const dates = Math.abs((startTime - endTime) / 86400000);

    return Math.floor(dates);
  }
}

