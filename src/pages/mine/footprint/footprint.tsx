import React, {useState, useEffect} from 'react';
import Taro, {useDidShow, useDidHide, useShareAppMessage} from '@tarojs/taro';
import {View, BaseEventOrig, Image} from '@tarojs/components';
import {AtButton} from "taro-ui";
import HorGoodItemWhole from "@graft/components/horGoodItemWhole/HorGoodItemWhole";
import noData from "@graft/assets/no-data.png";
import './footprint.scss';

const Footprint: React.FC = () => {
  const [footprintList, setFootprintList] = useState<Params.FootprintEntity[]>([]);
  const [startTimestamp, setStartTimestamp] = useState<number>(0);

  const getFootprintList = async () => {
    const footprintArrayList: string = Taro.getStorageSync('footprintArray')
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const footprintList: Params.FootprintEntity[] = JSON.parse(footprintArrayList);
    console.log(footprintList)
    setFootprintList(footprintList);
  }

  useEffect(() => {
    //componentDidMount
    return () => {
      //componentWillUnmount
    };
  }, []);

  useDidShow(() => {
    getFootprintList().then(() => {
      console.log('获取足迹列表成功')
    });
  });

  useDidHide(() => {
    console.log('页面隐藏');
  });

  useShareAppMessage(() => {
    return {
      title: '电动车产品库',
      desc: '电动车产品库',
      path: '/pages/index/index',
    };
  });

  const handleTouchStart = (event: BaseEventOrig) => {
    const startTimestamp = event.timeStamp
    setStartTimestamp(startTimestamp)
    console.log(`startTimestamp:${startTimestamp}`)
  };

  const handleTouchEnd = (event: BaseEventOrig, item: Params.FootprintEntity) => {
    const endTimestamp = event.timeStamp
    console.log(`endTimestamp:${endTimestamp}`)
    ifDeleteItem(item, startTimestamp, endTimestamp).then(r => console.log(r));
  };

  const ifDeleteItem = async (item: Params.FootprintEntity, start: number, end: number) => {
    const duration = end - start;
    console.log(`duration:${duration}`);

    if (duration > 1000) {
      const result = await Taro.showModal({
        title: '请确认',
        content: '要删除所选足迹？',
      });

      if (result.confirm) {
        const id: string | undefined = item.id
        //根据id匹配footprintList中的数据，删除对应的数据
        const newFootprintList: Params.FootprintEntity[] = footprintList.filter((b) => b.id !== id);
        setFootprintList(newFootprintList)
        Taro.setStorage({
          key: "footprintArray",
          data: JSON.stringify(newFootprintList)
        }).then(() => {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1000,
          });
        });
      }
    } else {
      Taro.navigateTo({
        url: `/pages/detail/detail?goodId=${item.goodId}`,
      });
    }
  };

  const jumpIndex = async () => {
    Taro.switchTab({
      url: `/pages/index/index`
    });
  }

  return (
    <View className='container'>
      <View className='footprint'>
        {footprintList.length == 0 && (
          <View className='empty'>
            <Image
              src={noData}
              className='empty-img'
              mode='aspectFill'
            ></Image>
            <View className='empty-box'>
              <View className='empty-box-txt'>您还没有浏览任何商品</View>
              <AtButton type='primary' size='small' onClick={jumpIndex}>返回首页</AtButton>
            </View>
          </View>
        )}
        {footprintList.length > 0 && footprintList.map((item, index) => {

          const goodItem: Params.GoodItem = {
            goodId: item.goodId,
            goodTitle: item.goodTitle,
            goodBrief: item.goodBrief,
            scenePicUrl: item.url,
          };
          return (
            <View
              className='footprint-item'
              key={index}
              onTouchStart={(e) => handleTouchStart(e)}
              onTouchEnd={(e) => handleTouchEnd(e, item)}
            >
              <HorGoodItemWhole goodItem={goodItem}></HorGoodItemWhole>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Footprint;
