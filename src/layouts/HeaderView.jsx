import React, { PureComponent } from 'react';
import { connect } from 'dva';
import NavLink from 'umi/link';
import { Layout, Icon, Badge, Avatar, Menu, Dropdown } from 'antd';
import PropTypes from 'prop-types'

const { Header } = Layout;

class HeaderView extends PureComponent {
  handleClickMenu = e => {

    e.key === 'SignOut' && this.props.onSignOut()
  }

  changelangs=e=>{
    const {dispatch} = this.props;
    dispatch({ type: 'common/chlang',payload: e.key, })
  }

  toggle = () => {
    this.props.toggle();
  };

  render() {
    const { collapsed, islogin } = this.props;

    const menu = (
      <Menu onClick={this.handleClickMenu}>
        <Menu.Item key="shouye">
          <a target="_blank" rel="noopener noreferrer" href="#">
            回到首页
          </a>
        </Menu.Item>
        <Menu.Item key="person">>
            个人中心
        </Menu.Item>
        <Menu.Item key="SignOut">
            退出
        </Menu.Item>
      </Menu>
    );

    const lang = (
      <Menu onClick={this.changelangs}>
        <Menu.Item key="zh_CN">
            中文
        </Menu.Item>
        <Menu.Item key="en_US">
            English
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={'trigger'}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <div className="right">
          <Badge count={100}>
            <Icon type="bell" />
          </Badge>

          <Avatar
            size="small"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />

          {islogin && (
            <Dropdown overlay={menu} placement="bottomRight">
              <span>duuliy</span>
            </Dropdown>
          )}

          <Dropdown overlay={lang} placement="bottomRight">
            <Icon type="global" />
          </Dropdown>
        </div>
      </Header>
    );
  }
}

HeaderView.propTypes = {
  toggle:PropTypes.func,
  collapsed:PropTypes.bool, 
  islogin:PropTypes.bool,
  onSignOut: PropTypes.func,
};

export default connect(({common})=>({language:common.language}))(HeaderView);
