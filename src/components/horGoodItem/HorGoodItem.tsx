// HorGoodItem.tsx
import React from 'react';
import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import './HorGoodItem.scss';

export type HorGoodItemProps = {
  goodItem: Params.GoodItem;
};

const jumpDetail = async (event: any) => {
  const goodId = event.currentTarget.dataset.goodId;
  Taro.navigateTo({
    url: `/pages/detail/detail?goodId=${goodId}`
  });
};

const HorGoodList: React.FC<HorGoodItemProps> = (props) => {
  return (
    <View className="horGoodList-item" key={props.goodItem.goodId} data-good-id={props.goodItem.goodId}
          onClick={jumpDetail}>
      <Image
        mode={'aspectFill'}
        className="horGoodList-item-img"
        src={props.goodItem.scenePicUrl || ''}
      ></Image>
      <View className="horGoodList-item-grid">
        <Text className="horGoodList-item-grid-title">{props.goodItem.goodTitle}</Text>
        <Text className="horGoodList-item-grid-brief">{props.goodItem.goodBrief}</Text>
      </View>
    </View>
  );
};

export default HorGoodList;
