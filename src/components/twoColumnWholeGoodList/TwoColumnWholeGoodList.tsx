// TwoColumnGoodList.tsx
import React from 'react';
import {View} from '@tarojs/components';
import './TwoColumnWholeGoodList.scss';
import GoodItem from "@graft/components/goodItem/GoodItem";

export type TwoColumnGoodListProps = {
  goodList: Params.GoodItem[];
  floorName?: string;
  floorId?: string;
};

const TwoColumnGoodList: React.FC<TwoColumnGoodListProps> = (props) => {
  return (
    <View className="twoColumnGoodList">
      {props.goodList.map((item) => {
        return (
          <GoodItem goodItem={item}/>
        )
      })}
    </View>
  );
};

export default TwoColumnGoodList;
