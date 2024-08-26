// HorGoodList.tsx
import React from 'react';
import {ScrollView} from '@tarojs/components';
import HorGoodItem from "@graft/components/horGoodItem/HorGoodItem";

import './HorGoodList.scss';

export type HorGoodListProps = {
  goodList: Params.GoodItem[];
};

const HorGoodList: React.FC<HorGoodListProps> = (props) => {
  return (
    <ScrollView className="horGoodList" scrollX>
      {props.goodList.map((item) => {
        return (
          <HorGoodItem goodItem={item}/>
        )
      })}
    </ScrollView>
  );
};

export default HorGoodList;
