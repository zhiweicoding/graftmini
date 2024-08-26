import React from 'react';
import {Image, View} from '@tarojs/components';
import serviceLight from '@graft/assets/service_light.png';
import Taro from "@tarojs/taro";
import {queryStoreDetail} from "@graft/services/api";
import './staff.scss';


const Staff: React.FC = () => {

  const goToStaff = () => {
    Taro.getStorage({
      key: 'defaultStoreId',
      success: function (res) {
        const defaultStoreId = res.data;
        if (defaultStoreId && defaultStoreId !== '') {
          queryStoreDetail({
            storeId: defaultStoreId
          }).then(r => {
            const staffWx = r.staffWx;
            if (staffWx) {
              Taro.openCustomerServiceChat({
                extInfo: {url: `${staffWx}`},
                corpId: 'ww115db6fd649631c9',
                success: function (res) {
                  console.log(res);
                }
              })
            } else {
              Taro.navigateTo({
                url: '/pages/store/list/list',
              });
            }
          })
        } else {
          Taro.navigateTo({
            url: '/pages/store/list/list',
          });
        }
      },
      fail: function () {
        Taro.navigateTo({
          url: '/pages/store/list/list',
        });
      }
    })
  };

  return (
    <View className={`all_staff_box_cls`} onClick={goToStaff}>
      <Image src={serviceLight} mode={`scaleToFill`} className={`all_staff_img_cls`}/>
    </View>
  );
};

export default Staff;
