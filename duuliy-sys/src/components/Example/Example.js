import React from 'react';
import PropTypes from 'prop-types'

const Example = ({
  onDeleteItem,
  arr=[],
}) => {

  
  // let menu
  // setTimeout(()=>{
  //   menu = arr.map((key,item) => ( <li key={key}>{item}</li>))
  // },500)

  const menu = arr.map((key,item) => ( <li key={key}>{item}</li>))
  return (
    <div>
      <ul>
        {menu}
      </ul>
      <button onClick={onDeleteItem}>这是按钮</button>
    </div>
  );
};

Example.propTypes = {
  onDeleteItem: PropTypes.func,
  arr: PropTypes.array
};

export default Example;
