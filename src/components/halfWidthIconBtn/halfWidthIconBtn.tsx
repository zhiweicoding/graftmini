// HalfWidthIconBtn.tsx
import React from 'react';
import {View, Image} from '@tarojs/components';
import './halfWidthIconBtn.scss';

export type HalfWidthIconBtnProps = {
  imgSrc: string,
  title: string,
  subTitle: string,
  darkColor: string
  lightColor: string,
  onClick?: () => void
};

const HalfWidthIconBtn: React.FC<HalfWidthIconBtnProps> = (props: HalfWidthIconBtnProps) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <View className='bottom-bar-item ' style={{backgroundColor: props.lightColor}}
          onClick={handleClick}
    >
      <View className='bottom-bar-icon-wrapper'>
        <View className={'bottom-bar-icon-background '}
              style={{backgroundColor: props.darkColor}}
        />
        <Image
          src={props.imgSrc}
          className='bottom-bar-img'
          mode='aspectFit'
        />
      </View>
      <View>
        <View className='bottom-bar-text-title'>{props.title}</View>
        <View className='bottom-bar-text-subtitle'>{props.subTitle}</View>
      </View>
    </View>
  );
};

export default HalfWidthIconBtn;
