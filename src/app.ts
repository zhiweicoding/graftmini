import {Component, PropsWithChildren} from 'react'

import Taro from "@tarojs/taro";
import './app.scss'
import './custom-theme.scss'


class App extends Component<PropsWithChildren> {
  componentDidMount() {
    const updateManager = Taro.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      // Called when a new version is checked
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(() => {
      // New version downloaded
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启小程序？',
        success: (res) => {
          if (res.confirm) {
            // Restart the app
            updateManager.applyUpdate();
          }
        }
      }).then(r => {
        console.log(r)
      });
    });

    updateManager.onUpdateFailed(() => {
      // New version download failed
      Taro.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      });
    });
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
