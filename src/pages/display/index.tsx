import {View, Button, Radio, Text, Image} from "@tarojs/components";
import Taro, {useShareAppMessage} from "@tarojs/taro";
import React, {useState, useEffect} from "react";
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


  useShareAppMessage(() => {
    return {
      title: '红抖抖去水印',
      desc: '愿所有的视频没有水印',
      path: "/pages/index/index?share=true",
      imageUrl: sharePic,
    };
  });

  useEffect(() => {
  }, []);


  const clickVideo = () => {
    setMediaUrl('https://finance.zhiwei.plus/proxy/oss/download/dy/20240910/MS4wLjABAAAAILurPd4X1WrC0e-PJsU9mQxBDDp2hLi8Z6h2xtg4fVgGIRXA2FHe3K2wraDe5oeM/5a066a950fc4409f92ccf0d57d3915ea_video.mp4');
    setIsVideo(true);
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
        {['Item 1', 'Item 2'].map((_item, index) => (
          <DisplayItem
            key={index}
            index={index}
            src='https://finance.zhiwei.plus/proxy/oss/download/dy/20240910/MS4wLjABAAAAILurPd4X1WrC0e-PJsU9mQxBDDp2hLi8Z6h2xtg4fVgGIRXA2FHe3K2wraDe5oeM/5a066a950fc4409f92ccf0d57d3915ea_cover.jpeg'
            title={'图片'}
            isSelected={selectedItems[index]}
            onToggleSelect={toggleSelectItem}
            onClick={clickVideo}
          />
        ))}
      </View>


      <View className='description'>
        <View className={'desc_first_line'}><View className='input_msg_txt'>靠近我就是夏天 #完美身材
          #氛围感</View></View>
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
