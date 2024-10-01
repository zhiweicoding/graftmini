import {useRouter} from '@tarojs/taro'
import {View, WebView} from '@tarojs/components'
import React, {useEffect} from 'react'
import './webview.scss'

const WebViewPage: React.FC = () => {
  const router = useRouter();
  const {url} = router.params; // 获取传递的参数

  useEffect(() => {
    //componentDidMount
    console.log(url)
  }, []);

  return (
    <View className={'container'}>
      <WebView src={'https://mp.weixin.qq.com/s?__biz=MzAxMTUwODMyMQ==&mid=2455028214&idx=1&sn=319b16d8ad78724b0e1b68dac82e7681&chksm=8ce06ef8bb97e7ee9e5ea8f407d783262ceb7ece7dbec8fabe8d8f7e9f012b702a18dc6c79eb&token=271621668&lang=zh_CN#rd'} progressbarColor={'#f5222d'}/>
    </View>
  )
}

export default WebViewPage;
