import React, { useState, useEffect } from 'react';
import { AtIcon } from 'taro-ui'
import './Loading.scss';

const icons = ['video', 'image', 'download-cloud'];

const Loading: React.FC = () => {
  const [iconIndex, setIconIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const messages: string[] = [
    "正在解析视频...",
    "正在解析图文...",
    "正在保存内容..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        setIsTransitioning(false);
      }, 500); // 等待淡出动画完成后更新内容
    }, 2500); // 每1.5秒切换一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className={`icon-container ${isTransitioning ? 'transitioning' : ''}`}>
          <AtIcon value={icons[iconIndex]} size={40} color='#3498db' className="loading-icon" />
        </div>
        <div className={`loading-message ${isTransitioning ? 'transitioning' : ''}`}>
          {messages[iconIndex]}
        </div>
      </div>
    </div>
  );
};

export default Loading;
