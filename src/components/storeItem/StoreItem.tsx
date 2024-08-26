// StoreItem.tsx
import React from 'react';
import {View, Image, Switch} from '@tarojs/components';
import Taro from '@tarojs/taro';
import {AtButton, AtIcon} from "taro-ui";

import './StoreItem.scss';

export type StoreItemProps = {
  item: Params.StoreBean;
  onSwitchChange: (storeId: string, checked: boolean) => void;
  checked: boolean;
};

const StoreItem: React.FC<StoreItemProps> = (props) => {

  const jumpDetail = async (storeId: string) => {
    Taro.navigateTo({
      url: `/pages/store/detail/detail?storeId=${storeId}`
    });
  };

  const switchChangeAction = (event) => {
    const storeId = event.currentTarget.dataset.storeId;
    const checked = event.detail.value;
    props.onSwitchChange(storeId, checked);
  }

  const callPhone = (event) => {
    const phoneNum = event.currentTarget.dataset.phoneNum;
    Taro.makePhoneCall({
      phoneNumber: phoneNum
    });
  }

  const goToMap = (event) => {
    const distance = event.currentTarget.dataset.distance;
    console.log(distance);
    const lat: number = event.currentTarget.dataset.lat;
    const lng: number = event.currentTarget.dataset.lng;
    Taro.openLocation({
      latitude: lat,
      longitude: lng,
      scale: 18
    })
  }

  return (
    <View className={'sl'}>
      <View className="sl-head">
        <Image
          mode={'aspectFit'}
          className={'sl-head-img'}
          src={props.item.storeLogo || ``}
        />
        <View className="sl-head-left">
          <View className={`sl-head-left-line`}>
            <View className="sl-head-left-line-title">
              {props.item.storeName}
            </View>
            <View className="sl-head-left-line-distance" data-distance={props.item.distance} data-lng={props.item.lng}
                  data-lat={props.item.lat} onClick={goToMap}>
              <AtIcon value={'map-pin'} size={16} color={'#999'}/>
              <View className="sl-head-left-line-distance-text">
                {props.item.distance}
              </View>
              <View className="sl-head-left-line-distance-text">
                公里
              </View>
            </View>
          </View>
          <View className="sl-head-left-desc">
            {props.item.storeDesc}
          </View>
        </View>
      </View>
      <View className="sl-mid">
        <View className={'sl-mid-item'} onClick={callPhone} data-phone-num={props.item.phoneNum}>
          <AtIcon value={'phone'} size={20} color={'#999'}/>
          <View className={'sl-mid-item-desc'}>{props.item.phoneNum}</View>
        </View>
        {
          props.item.backupPhoneNum && props.item.backupPhoneNum != '' && (
            <View className={'sl-mid-item'} data-phone-num={props.item.backupPhoneNum} onClick={callPhone}>
              <AtIcon value={'phone'} size={20} color={'#999'}/>
              <View className={'sl-mid-item-desc'}>{props.item.backupPhoneNum}</View>
            </View>
          )
        }
      </View>
      <View className="sl-last">
        <View className={'sl-last-item'}>
          <View className={'sl-last-item-txt'}>默认门店</View>
          <Switch className={'sl-last-item-switch'} data-store-id={props.item.storeId} checked={props.checked}
                  onChange={switchChangeAction}/>
        </View>
        <AtButton className={`sl-last-btn`} type='secondary' size='small'
                  onClick={() => jumpDetail(props.item.storeId!)}>查看门店信息</AtButton>
      </View>
    </View>
  );
};

export default StoreItem;
