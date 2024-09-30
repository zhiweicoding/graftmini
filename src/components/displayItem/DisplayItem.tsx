import React from 'react';
import {View, Image, Text, Radio} from '@tarojs/components';
import './DisplayItem.scss';

interface ImageItemProps {
  index: number;
  src: string;
  title: string;
  isSelected: boolean;
  onToggleSelect: (index: number) => void;
  onClick: () => void;
}

const ImageItem: React.FunctionComponent<ImageItemProps> = ({
                                                              index,
                                                              src,
                                                              title,
                                                              isSelected,
                                                              onToggleSelect,
                                                              onClick
                                                            }) => {
  return (
    <View className={'src_part'} key={index}>
      <Image
        onClick={onClick}
        className={'src_part_body_img'}
        mode={`aspectFit`}
        src={src}
      />
      <View className={'src_part_title'}>
        <View className={'src_part_title_left'}>
          <Text className={'src_part_title_left_txt'}>{title}</Text>
        </View>
        <View className={'src_part_title_right'}>
          <Radio
            className={'src_part_title_right_radio'}
            checked={isSelected}
            onClick={() => onToggleSelect(index)}
            color={'#e06253'}
          />
        </View>
      </View>
    </View>
  );
};

export default ImageItem;
