// GoodList.tsx
import React from 'react';
import {ScrollView} from '@tarojs/components';
import HorGoodItem from "@graft/components/goodItem/GoodItem";

import './GoodList.scss';

export type HorGoodListProps = {
  goodList: Params.GoodItem[];
};

const GoodList: React.FC<HorGoodListProps> = (props) => {
  return (
    <ScrollView className="horGoodList" scrollX>
      {props.goodList.map((item, index: number) => {
        return (
          <HorGoodItem key={index} goodItem={item}/>
        )
      })}
    </ScrollView>
  );
};

export default GoodList;
