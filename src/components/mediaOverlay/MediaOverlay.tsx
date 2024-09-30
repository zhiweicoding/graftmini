import React from 'react';
import {View, Video, Image} from '@tarojs/components';
import {AtIcon} from 'taro-ui';
import './MediaOverlay.scss';

interface MediaOverlayProps {
  url: string;
  isVideo: boolean;
  isVisible: boolean;
  onClose: () => void;
}

const MediaOverlay: React.FunctionComponent<MediaOverlayProps> = ({url, isVideo, isVisible, onClose}) => {
  if (!isVisible) return null;

  return (
    <View className='float_windows'>
      {isVideo ? (
        <Video
          className='float_windows_video'
          src={url}
          controls
          object-fit='fill'
          loop
          muted
          id='float_windows_video_id'
        />
      ) : (
        <Image
          className='float_windows_img'
          mode='aspectFit'
          src={url}
        />
      )}
      <View className='float_windows_close' onClick={onClose}>
        <AtIcon value='close' size='35' className='float_windows_at_icon'/>
      </View>
    </View>
  );
};

export default MediaOverlay;
