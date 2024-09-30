import React, {useEffect} from 'react'
import Taro, {useDidShow, useDidHide, useShareAppMessage, usePageScroll} from '@tarojs/taro';
import {
  View,
  Image,
} from '@tarojs/components'
import {AtButton} from "taro-ui";
import noData from '@graft/assets/no-data.png';

import './error.scss'

const Error: React.FC = () => {

  useEffect(() => {
    //componentDidMount
    return () => {
      //componentWillUnmount
    };
  }, []);

  useDidShow(() => {
  });

  useDidHide(() => {
  });

  useShareAppMessage(() => {
    return {
      title: '红抖抖去水印',
      desc: '愿所有的视频没有水印',
      path: "/pages/index/index?share=true",
    };
  });

  usePageScroll((res) => {
    console.log(res)
  });

  const jumpIndex = async () => {
    await Taro.switchTab({
      url: `/pages/index/index`
    });
  }

  return (
    <View className="empty">
      <Image
        src={noData}
        className="empty-img"
        mode="aspectFill"
      ></Image>
      <View className="empty-box">
        <View className="empty-box-txt">信息找不到了</View>
        <AtButton type='primary' size='small' onClick={jumpIndex}>返回首页</AtButton>
      </View>
    </View>
  )
}

export default Error;

