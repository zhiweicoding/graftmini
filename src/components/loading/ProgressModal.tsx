import React from 'react';
import { View, Text } from '@tarojs/components';
import './ProgressModal.scss';

interface ProgressModalProps {
  visible: boolean;
  title: string;
  content: string;
  progress: number;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ visible, title, content, progress }) => {
  if (!visible) return null;

  return (
    <View className='progress-modal'>
      <View className='progress-modal-content'>
        <Text className='progress-modal-title'>{title}</Text>
        <Text className='progress-modal-text'>{content}</Text>
        <View className='progress-bar'>
          <View className='progress-bar-fill' style={{ width: `${progress}%` }} />
        </View>
      </View>
    </View>
  );
};

export default ProgressModal;
