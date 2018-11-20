// import React from 'react';
import PropTypes from 'prop-types'



const Footer = ({footer}) => {

  return (
    <div className='footer'>
        这是{footer}
    </div>
  );
};

Footer.propTypes = {
  footer: PropTypes.string
};

export default Footer;
