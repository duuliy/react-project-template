import React ,{PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import { NavLink } from 'dva/router';
import './style.less';
import config from '../config/config.js'
import Header from './HeaderView';
import Footer from './Footer';
import Breadcrumbs from '../components/Breakcrumbs/Breakcrumbs';
import { Layout , Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const { Sider, Content } = Layout;

// function BasicLayout({children}) {
//   return (
//     <div className={styles.normal}>
//       {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
//       菜单
//       { children }
//     </div>
//   );
// }
@connect(({ common, loading }) => ({ common, loading }))

class BasicLayout extends PureComponent {
  state = {
    PrefixCls: "BasicLayout",
    collapsed: false,
    current:"1",
    islogin:true
  };
  onSignOut() {
    const {dispatch} = this.props;
    dispatch({ type: 'common/signOut' })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleClick=(e)=>{
    this.setState({
        current: e.key,
      });
  }

  render() {
    const {children} = this.props;
    const { current,collapsed,PrefixCls,islogin } = this.state;
    return (
      <Fragment>
      <Layout className={PrefixCls}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className={"logo"} >
             <img alt="logo" src={config.logoPath}/>  
             {!!collapsed||(<span>日志打印系统</span>)}
          </div>
          <Menu theme="dark" mode="inline" onClick={this.handleClick} selectedKeys={[current]} defaultSelectedKeys={['1']}>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            {/* 项目开始时请删除这个页面 */}
              <Menu.Item key="example">
               <NavLink to="/one/example">
                 <span>example</span>
               </NavLink>
              </Menu.Item>
              {/* 项目开始时请删除这个页面 */}
              <Menu.Item key="user">
               <NavLink to="/one/user">
                 <span>user</span>
               </NavLink>
              </Menu.Item>
              <Menu.Item key="404">
               <NavLink to="/404">
                 <span>404</span>
               </NavLink>
              </Menu.Item>
              <Menu.Item key="products">
               <NavLink to="/one/products">
                 <span>products</span>
               </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="products" /><span>Navigation two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="video-camera" /><span>Navigation three</span></span>}>
              <Menu.Item key="15">Option 9</Menu.Item>
              <Menu.Item key="16">Option 10</Menu.Item>
              <Menu.Item key="17">Option 11</Menu.Item>
              <Menu.Item key="18">Option 12</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="upload" /><span>Navigation four</span></span>}>
              <Menu.Item key="25">Option 13</Menu.Item>
              <Menu.Item key="26">Option 14</Menu.Item>
              <Menu.Item key="27">Option 15</Menu.Item>
              <Menu.Item key="28">Option 16</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>

          <Header toggle={this.toggle} islogin={islogin} onSignOut={this.onSignOut}/>

          <Breadcrumbs></Breadcrumbs>
          
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {children}
          </Content>

          <Footer footer={'脚部'}></Footer>
        </Layout>
      </Layout>
      </Fragment>
    );
  }
}

BasicLayout.propTypes = {
};

export default connect()(BasicLayout);
