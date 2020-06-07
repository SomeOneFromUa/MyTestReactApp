import React from 'react';

import { socialMediaIcons } from '../../constants/index';

import './Footer.scss';

export function Footer(props) {
  return (
    <div className="may-footer fixed-bottom ">
      <div className="may-footer-content">
      <div className="may-footer-text">Some text about authors</div>
      <div className="may-footer-social-media-wrapper">
          {socialMediaIcons.map(icon => {
              return  <img className="may-footer-social-media-icon"
                           key={icon.alt}
                           src={icon.src}
                           alt={icon.alt}/>
          })}
      </div>
      </div>
      <div>All rights reserved. may-app © 2020</div>
    </div>
  );
}

