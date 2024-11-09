// src/Background.js
import React from 'react';
import './Background.scss';
import bgImage from './CanadaBGimgTileVersion.jpg';


const Background = () => {
  return <div className="background" style={{ backgroundImage: `url(${bgImage})` }}>
</div>;
};

export default Background;
