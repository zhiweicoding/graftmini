import React, {useEffect, useState} from 'react';
import {View, Textarea, Button} from '@tarojs/components';
import Taro, {useDidHide, useDidShow, usePageScroll, useShareAppMessage} from '@tarojs/taro';
import {saveAdvice} from '@graft/services/api';
import {AtToast} from 'taro-ui';
import './feedback.scss';

const Feedback: React.FC = () => {

  const [msg, setMsg] = useState<string>('');
  const [submitSuccess, setSubmitResult] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);


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
    console.log(res);
  });

  const msgAction = async (e: any) => {
    setMsg(e.detail.value);
  };

  const submitFeedback = async () => {
    try {
      const response: boolean = await saveAdvice({
        msg: msg,
      });
      if (response) {
        setSubmitResult(true);
        setSubmitError(false);
      } else {
        setSubmitError(true);
        setSubmitResult(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const backAction = async () => {
    await Taro.switchTab({
      url: '/pages/mine/index/index',
    });
  };

  return (
    <View className='container'>

      <AtToast isOpened={submitSuccess} text='反馈成功' status='success' hasMask duration={2000}
               onClose={backAction}
      ></AtToast>
      <AtToast isOpened={submitError} text='操作失败' status='error' hasMask duration={2000}
               onClose={backAction}
      ></AtToast>


      <View className='fb-body'>
        <Textarea
          className='content'
          placeholder='对我们书籍服务，你还有什么建议吗？你还希望在咱们的软件上看到什么书籍呢？请告诉我们...'
          onInput={msgAction.bind(this)}
          value={msg}
        ></Textarea>
        <View className='text-count'>0/500</View>
      </View>

      <Button className='fb-btn' onClick={submitFeedback}>
        提交
      </Button>
    </View>
  );
};

export default Feedback;
