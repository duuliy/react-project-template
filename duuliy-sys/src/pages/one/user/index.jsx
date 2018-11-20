import React, { Component, PropTypes } from 'react';
import { Calendar } from 'antd';

class user extends Component {
  constructor(props) {
    super(props);
  }

  onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  render() {
    return (
      <div className="user">
        <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
      </div>
    );
  }
}

export default user;
