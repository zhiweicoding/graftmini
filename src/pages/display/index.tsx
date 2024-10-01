import {Button, Radio, View,} from "@tarojs/components";
import Taro, {useShareAppMessage} from "@tarojs/taro";
import React, {useEffect, useState} from "react";
import sharePic from "@graft/assets/sharePic.jpg";
import MediaOverlay from "@graft/components/mediaOverlay/MediaOverlay";
import DisplayItem from "@graft/components/displayItem/DisplayItem";

import "./index.scss";

interface IIndexProps {
}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const [displayFloat, setDisplayFloat] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>(''); // Set this to the URL you want to display
  const [isVideo, setIsVideo] = useState<boolean>(false); // Set to true if the URL is a video
  const [selectedItems, setSelectedItems] = useState<boolean[]>([true, true]); // Adjust size for the number of items
  const [queryRes, setQueryRes] = useState<Params.MixDisplay | null>(null);

  useShareAppMessage(() => {
    return {
      title: '红抖抖去水印',
      desc: '愿所有的视频没有水印',
      path: "/pages/index/index?share=true",
      imageUrl: sharePic,
    };
  });

  useEffect(() => {
    // 获取存储的 queryRes
    const storedQueryRes: Params.MixResponse = Taro.getStorageSync('queryRes');
    if (storedQueryRes) {
      const display: Params.MixDisplay = convertMixResponseToMixDisplay(storedQueryRes)
      setQueryRes(display);

      // 使用完后可以选择性地移除存储的数据
      Taro.removeStorageSync('queryRes');
    } else {
      // 处理未获取到数据的情况
      console.error('No queryRes found in storage');
    }
  }, []);

  const convertMixResponseToMixDisplay = (response: Params.MixResponse): Params.MixDisplay => {
    let urlArray: Params.DisplayItem[] = [];

    if (response.videoUrl && response.videoUrl.length > 0) {
      // 如果有视频，生成视频的 DisplayItem 数组
      urlArray = response.videoUrl.map((videoUrl) => ({
        isVideo: true,
        cover: response.coverUrl || '', // 使用视频封面
        url: videoUrl,
      }));
    } else if (response.imageUrls && response.imageUrls.length > 0) {
      // 如果有图片，生成图片的 DisplayItem 数组
      urlArray = response.imageUrls.map((imageUrl) => ({
        isVideo: false,
        cover: imageUrl, // 图片的封面就是图片本身
        url: imageUrl,
      }));
    }
    let content: string = '';
    if (response.title && response.title.length > 0) {
      content = response.title;
    }
    if (response.desc && response.desc.length > 0) {
      content = content + '\n\t' + response.desc;
    }

    // 构造 MixDisplay 对象
    return {
      urlArray,
      content: content,
      type: response.type || 0,
      from: response.from || '',
      empty: response.empty,
      mid: response.mid,
      author: response.author,
    };
  }

  const clickVideo = (item: Params.DisplayItem) => {
    console.log(JSON.stringify(item))
    setMediaUrl(item.url);
    setIsVideo(item.isVideo);
    setDisplayFloat(true);
  }
  const closeFloat = () => {
    setDisplayFloat(false)
    const videoContext = Taro.createVideoContext('float_windows_video_id')
    videoContext.stop()
  }

  const toggleSelectAll = (checked: boolean) => {
    setSelectedItems(selectedItems.map(() => checked));
  };

  const toggleSelectItem = (index: number) => {
    setSelectedItems(prev => {
      const newSelectedItems = [...prev];
      newSelectedItems[index] = !newSelectedItems[index];
      return newSelectedItems;
    });
  };

  return (
    <View className='container'>

      <MediaOverlay
        url={mediaUrl}
        isVideo={isVideo}
        isVisible={displayFloat}
        onClose={closeFloat}
      />

      <View className={'multi_info'}>
        <View className={'all_check'}>
          <Radio className={'all_check_radio'}
                 value='全选'
                 color={'#e06253'}
                 checked={selectedItems.every(Boolean)}
                 onClick={() => toggleSelectAll(!selectedItems.every(Boolean))}
          >
            全选
          </Radio>
        </View>
        {queryRes?.urlArray.map((item, index) => (
          <DisplayItem
            key={index}
            index={index}
            src={item.cover}
            title={item.isVideo ? '视频' : '图片'}
            isSelected={selectedItems[index]}
            onToggleSelect={toggleSelectItem}
            onClick={() => clickVideo(item)}
          />
        ))}
      </View>


      <View className='description'>
        <View className={'desc_first_line'}><View className='input_msg_txt'>{queryRes?.content}</View></View>
        <View className={'desc_second_line'}><Button className={"copy_txt_btn"}>复制文案内容</Button></View>
      </View>

      <View className={"relation_bottom"}>
        <Button className={"cancel_btn"}>取消</Button>
        <Button className={"save_btn"}>保存视频到相册</Button>
      </View>
    </View>
  );
};

export default Index;
