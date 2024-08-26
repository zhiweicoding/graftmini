import {useRouter} from '@tarojs/taro'
import {View, WebView} from '@tarojs/components'
import React, {useEffect} from 'react'
import './webview.scss'

const WebViewPage: React.FC = () => {
  const router = useRouter();
  const {url} = router.params; // 获取传递的参数

  useEffect(() => {
    //componentDidMount
  }, []);

  return (
    <View className={'container'}>
      <WebView src={url || ''} progressbarColor={'#f5222d'}/>
    </View>
  )
}

export default WebViewPage;
