import React, {useEffect} from 'react'
import Taro, {useDidShow, useDidHide, useShareAppMessage, usePageScroll} from '@tarojs/taro';
import './index.scss'
import {
  Text,
  View,
  OpenData,
} from '@tarojs/components'

const Index: React.FC = () => {


  useEffect(() => {
    //componentDidMount
    // 返回的函数将在组件卸载时执行
    return () => {
      //componentWillUnmount
    };
  }, []);


  useDidShow(() => {
    console.log('页面显示');
  });

  useDidHide(() => {
    console.log('页面隐藏');
  });

  useShareAppMessage(() => {
    return {
      title: '电动车产品库',
      desc: '电动车产品库',
      path: '/pages/mine/index/index',
    }
  });

  usePageScroll((res) => {
    console.log(res)
  });

  const footprintAction = () => {
    Taro.navigateTo({
      url: '/pages/mine/footprint/footprint'
    });
  }
  const feedbackAction = async () => {
    Taro.navigateTo({
      url: '/pages/mine/feedback/feedback'
    });
  }
  const storeAction = () => {
    Taro.navigateTo({
      url: '/pages/store/list/list'
    });
  }

  return (
    <View className='container'>
      <View className='profile-info'>
        <OpenData className='avatar' type='userAvatarUrl'></OpenData>
        <View className='info'>
          <OpenData className='name' lang='zh_CN' type='userNickName'></OpenData>
        </View>
      </View>
      <View className='user-menu'>
        <View className='item'>
          <View className='a' onClick={footprintAction}>
            <Text className='icon footprint'></Text>
            <Text className='txt'>浏览足迹</Text>
          </View>
        </View>
        <View className='item'>
          <View className='a' onClick={storeAction}>
            <Text className='icon storeList'></Text>
            <Text className='txt'>附近门店</Text>
          </View>
        </View>
        <View className='item'>
          <View className='a' onClick={feedbackAction}>
            <Text className='icon mail'></Text>
            <Text className='txt'>意见反馈</Text>
          </View>
        </View>

        {/*<View*/}
        {/*  className="item"*/}
        {/*  style={{*/}
        {/*    background: '#f4f4f4',*/}
        {/*    borderRight: '0rem',*/}
        {/*    borderBottom: '0rem',*/}
        {/*  }}*/}
        {/*></View>*/}
      </View>
    </View>
  )
}

export default Index;

