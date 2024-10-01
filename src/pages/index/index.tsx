import {View, Text, Button, Swiper, SwiperItem, Image,} from "@tarojs/components";
import {AtNoticebar} from 'taro-ui'
import Taro, {useShareAppMessage} from "@tarojs/taro";
import React, {useState, useEffect} from "react";
import shareIcon from "@graft/assets/share.png";
import sharePic from "@graft/assets/sharePic.jpg";
import tutorialIcon from "@graft/assets/howtouse.png";
import {parse, queryById} from "@graft/services/api";
import HalfWidthIconBtn from "@graft/components/halfWidthIconBtn/halfWidthIconBtn";
import b1 from "@graft/assets/banner.png";
import b2 from "@graft/assets/banner2.jpg";
import Loading from "@graft/components/loading/Loading";

import "./index.scss";

interface IIndexProps {
}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const [url, setUrl] = useState("");
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useShareAppMessage(() => {
    return {
      title: '红抖抖去水印',
      desc: '愿所有的视频没有水印',
      path: "/pages/index/index?share=true",
      imageUrl: sharePic,
    };
  });

  useEffect(() => {
    let pollTimer: NodeJS.Timeout;

    // 清理函数
    return () => {
      if (pollTimer) {
        clearTimeout(pollTimer);
      }
    };
  }, []);

  const toHelp = () => {
    Taro.navigateTo({
      url: "/pages/webview/webview",
    }).then(() => {
      console.log('redirect to webview ,show help page')
    })
  };

  const getUrl = () => {
    Taro.getClipboardData().then((res) => {
      if (res.data) {
        if (regUrl(res.data)) {
          setUrl(res.data);
        } else {
          Taro.showToast({
            title: "请复制短视频平台分享链接后再来",
            icon: "none",
            duration: 2000,
            mask: true,
          });
        }
      }
    });
  };

  const regUrl = (urlStr: string) => {
    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
      urlStr
    );
  };

  const findUrlByStr = (urlStr: string) => {
    let urls = urlStr.match(
      /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
    );
    if (urls) {
      return urls[0];
    }
    return "";
  };

  const start = () => {
    let urlNoText = findUrlByStr(url);
    setIsLoading(true);

    parse({
      url: urlNoText,
    }).then((res: Params.MixResponse) => {
      const pollForVideo = (rid: string) => {
        queryById(rid).then((queryRes: Params.MixResponse) => {
          if (queryRes.videoUrl && queryRes.videoUrl.length > 0 && !queryRes.empty) {
            console.log(JSON.stringify(queryRes))
            setIsLoading(false);
            Taro.setStorageSync('queryRes', queryRes);
            Taro.navigateTo({
              url: `/pages/display/index`,
            });
          } else {
            console.log("又一次")
            setTimeout(() => pollForVideo(res.mid), 1000);
          }
        }).catch((error) => {
          console.error("Error in queryById:", error);
          setIsLoading(false);
        });
      };

      pollForVideo(res.mid);
    }).catch((error) => {
      console.error("Error in parse:", error);
      setIsLoading(false);
    });
  };


  const toShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
    }).then(r => {
      console.log(r)
    })
  }

  return (
    <View className='index '>
      {isLoading && <Loading/>}
      <Swiper
        className='banner-list'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots={false}
        autoplay
      >
        <SwiperItem>
          <Image
            src={b1}
            className='banner-item'
            mode='widthFix'
          ></Image>
        </SwiperItem>
        <SwiperItem>
          <Image
            src={b2}
            className='banner-item'
            mode='widthFix'
          ></Image>
        </SwiperItem>
      </Swiper>
      <View className={"fix-top-banner padding-40"}>
        <View className='margin-left-right-20 '>
          <AtNoticebar icon='volume-plus' close={false}>
            支持提取小红书、抖音、快手等等多个App
          </AtNoticebar>
        </View>
        <View className='urlInput margin-20 min-height-160'>
          {url ? (
            <View className='hasurl min-height-160'>
              <View
                className='flex flex-1 padding-20'
                onClick={() => {
                  setIsShowBtn(true);
                }}
              >
                <Text className='url '>{url}</Text>
              </View>
              {isShowBtn ? (
                <View className='btns-warp flex flex-row justify-center align-center '>
                  <View className='btns'>
                    <Button
                      onClick={() => {
                        setIsShowBtn(false);
                        Taro.setClipboardData({data: url});
                      }}
                      className='copy'
                      size='mini'
                    >
                      复制
                    </Button>
                    <Button
                      onClick={() => {
                        setUrl("");
                        setIsShowBtn(false);
                      }}
                      className='clear'
                      size='mini'
                    >
                      清空
                    </Button>
                    {/* <Button onClick={toHistory} className="history" size="mini">
                    历史
                  </Button> */}
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            <View
              className='flex flex-row justify-center align-center min-height-250'
              onClick={getUrl}
            >
              <View className='flex flex-col'>
                <Text>点击此区域粘贴链接地址</Text>
                <Text className='tips'>提示：再次点击可清空或复制链接</Text>
              </View>
            </View>
          )}
        </View>
        <View>
          <Button
            loading={isLoading}
            onClick={start}
            disabled={!url}
            className='margin-20 start '
          >
            提取内容
          </Button>
        </View>


        <View className='flex flex-col help'>
          <Text className='title'>使用说明</Text>
          <View className='flex flex-col  padding-20'>
            <Text className='text'>
              1、打开短视频APP，在视频界面找到分享按钮
            </Text>
            <Text className='text'>2、点击“复制链接”或分享到微信获取分享链接</Text>
            <Text className='text'>
              3、回到小程序,点击顶部虚线区域粘贴链接地址
            </Text>
            <Text className='text'>
              4、点击上方“提取内容”按钮即可获得无水印视频
            </Text>
          </View>
        </View>


        <View className='bottom-bar'>
          <HalfWidthIconBtn imgSrc={shareIcon} title={'分享给好友'} subTitle={'推荐给好友'}
                            lightColor={'rgba(224, 207, 186, 0.3)'} darkColor={'rgba(236, 207, 172, 0.6)'}
                            onClick={toShare}
          />
          <HalfWidthIconBtn imgSrc={tutorialIcon} title={'图文教程'} subTitle={'如何去水印'}
                            darkColor={'rgba(229, 199, 193, 0.3)'}
                            lightColor={'rgba(241, 186, 175, 0.6)'} onClick={toHelp}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
