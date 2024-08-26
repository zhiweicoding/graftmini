// HorGoodItemWhole.tsx
import React from 'react';
import {View, Image, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import './HorGoodItemWhole.scss';

export type HorGoodItemWholeProps = {
  goodItem: Params.GoodItem;
};

const jumpDetail = async (event: any) => {
  const goodId = event.currentTarget.dataset.goodId;
  Taro.navigateTo({
    url: `/pages/detail/detail?goodId=${goodId}`
  });
};

const HorGoodList: React.FC<HorGoodItemWholeProps> = (props) => {
  return (
    <View className="horGoodListWhole-item" key={props.goodItem.goodId} data-good-id={props.goodItem.goodId}
          onClick={jumpDetail}>
      <Image
        mode={'aspectFill'}
        className="horGoodListWhole-item-img"
        src={props.goodItem.scenePicUrl || ''}
      ></Image>
      <View className="horGoodListWhole-item-grid">
        <Text className="horGoodListWhole-item-grid-title">{props.goodItem.goodTitle}</Text>
        <Text className="horGoodListWhole-item-grid-brief">{props.goodItem.goodBrief}</Text>
      </View>
    </View>
  );
};

export default HorGoodList;
