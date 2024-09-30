import React, {useEffect} from 'react'
import Taro, {useDidShow, useDidHide, useShareAppMessage, usePageScroll} from '@tarojs/taro';
import util from '@graft/utils/util'
import {getIdByCode} from "@graft/services/api";
import {
  Text,
  View,
  OpenData,
} from '@tarojs/components'

import './index.scss'

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
      title: '红抖抖去水印',
      desc: '愿所有的视频没有水印',
      path: "/pages/index/index?share=true",
    };
  });

  usePageScroll((res) => {
    console.log(res)
  });

  const footprintAction = () => {
    let openid = Taro.getStorageSync("openid")
    if (!openid) {
      Taro.showModal({
        title: '提示',
        content: '未登录用户暂时无法查看解析记录，可以点击确定授权登录',
        success: function (res) {
          if (res.confirm) {
            let code = null
            util
              .login()
              .then(loginRes => {
                code = loginRes.code
                return util.getUserInfo()
              })
              .then(userInfo => {
                if (!code) {
                  Taro.showToast({
                    title: '授权失败',
                    icon: 'error'
                  })
                } else {
                  console.log('login error:' + JSON.stringify(userInfo))
                  getIdByCode({
                    code: code
                  }).then(getCodeRes => {
                    openid = getCodeRes.openid;
                    Taro.setStorageSync("openid", openid);
                  }).catch(err => {
                    console.error('login error:' + err)
                  })
                }
              }).catch(err => {
              console.error('login error:' + err)
            })
          }
        }
      })
    } else {
      Taro.navigateTo({
        url: '/pages/mine/footprint/footprint'
      })
    }
  }

  const feedbackAction = async () => {
    Taro.navigateTo({
      url: '/pages/mine/feedback/feedback'
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
            <Text className='txt'>解析记录</Text>
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

