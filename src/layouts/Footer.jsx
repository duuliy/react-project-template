// import React from 'react';
import PropTypes from 'prop-types'



const Footer = ({footer}) => {

  return (
    <div className='footer'>
        这是{footer}
      {/* global.formatMsg("lang") */}
        {/* {global.formatMsg("lang")} */}
    </div>
  );
};

Footer.propTypes = {
  footer: PropTypes.string
};

export default Footer;
