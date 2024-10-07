// src/Background.js
import React from 'react';
import './Background.scss'; // Import your styles for the background

const Background = () => {
  return (
    <div className="background">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
        className="svg-background"
      >
        <g mask="url(#SvgjsMask1000)" fill="none">
          <rect width="100%" height="100%" fill="#0e2a47"></rect>
          <path d="M 0,107 C 57.6,135.4 172.8,251.8 288,249 C 403.2,246.2 460.8,95.6 576,93 C 691.2,90.4 748.8,242.6 864,236 C 979.2,229.4 1036.8,78.8 1152,60 C 1267.2,41.2 1382.4,125.6 1440,142L1440 560L0 560z" fill="#184a7e"></path>
          <path d="M 0,307 C 96,347.2 288,500.4 480,508 C 672,515.6 768,339.2 960,345 C 1152,350.8 1344,498.6 1440,537L1440 560L0 560z" fill="#2264ab"></path>
        </g>
        <defs>
          <mask id="SvgjsMask1000">
            <rect width="100%" height="100%" fill="#ffffff"></rect>
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default Background;
