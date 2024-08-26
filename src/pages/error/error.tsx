import React, {useEffect} from 'react'
import Taro, {useDidShow, useDidHide, useShareAppMessage, usePageScroll} from '@tarojs/taro';
import './error.scss'
import {
  View,
  Image,
} from '@tarojs/components'
import noData from '@graft/assets/no-data.png';
import {AtButton} from "taro-ui";

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
      title: '电动车产品库',
      desc: '电动车产品库',
      path: '/pages/index/index',
    }
  });

  usePageScroll((res) => {
    console.log(res)
  });

  const jumpIndex = async () => {
    Taro.switchTab({
      url: `/pages/index/index`
    });
  }

  return (
    <View className="empty">
      <Image
        src={noData}
        className={'empty-img'}
        mode={'aspectFill'}
      ></Image>
      <View className={'empty-box'}>
        <View className="empty-box-txt">信息找不到了</View>
        <AtButton type='primary' size='small' onClick={jumpIndex}>返回首页</AtButton>
      </View>
    </View>
  )
}

export default Error;

