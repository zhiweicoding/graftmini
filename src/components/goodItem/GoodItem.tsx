// HalfWidthIconBtn.tsx
import React from 'react';
import {View, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import './GoodItem.scss';

export type GoodItemProps = {
  goodItem: Params.GoodItem;
};

const jumpDetail = async (event: any) => {
  const goodId = event.currentTarget.dataset.goodId;
  await Taro.navigateTo({
    url: `/pages/detail/detail?goodId=${goodId}`
  });
};

const GoodItem: React.FC<GoodItemProps> = (props) => {
  return (
    <View
      className="good"
      data-good-id={props.goodItem.goodId}
      onClick={jumpDetail}
    >
      <Image
        mode="aspectFill"
        className="good-img"
        src={props.goodItem.listPicUrl || ''}
      />
      <View
        className="good-grid"
      >
        <View className="good-grid-title">
          <View className="good-grid-title-left">{props.goodItem.goodTitle}</View>

        </View>
        <View className="good-grid-brief">
          <View className="good-grid-brief-left">{props.goodItem.goodBrief}</View>
          <View className="good-grid-brief-right">
            <View className="good-grid-brief-right-heart at-icon at-icon-heart-2"></View>
            <View className="good-grid-brief-right-like">{props.goodItem.likeNum + '喜欢'}</View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoodItem;
