export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/help/index',
    'pages/display/index',
    'pages/error/error',
    'pages/webview/webview',
    'pages/mine/index/index',
    'pages/mine/footprint/footprint',
    'pages/mine/feedback/feedback',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#E74F3E',
    navigationBarTitleText: '红抖抖去水印',
    navigationBarTextStyle: 'white',
    backgroundColor: '#fff',
  },
  tabBar: {
    color: '#868686',
    selectedColor: '#f5222d',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/homeC.png',
      },
      {
        pagePath: 'pages/mine/index/index',
        text: '我的',
        iconPath: 'assets/people.png',
        selectedIconPath: 'assets/peopleC.png',
      },
    ],
  },
  requiredPrivateInfos: [
  ],
  permission: {
    "scope.writePhotosAlbum": {
      "desc": "你的相册权限将用于保存视频"
    }
  }
})
