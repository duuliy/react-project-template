import React from 'react';
import { connect } from 'dva';
import { Button, Radio, Icon, Row, Col, Layout, Menu, Breadcrumb,Card,Avatar,DatePicker   } from 'antd';
import style from './index.less'
import className from 'classname'


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } =Menu;
const {Meta} =Card;
const RangePicker =DatePicker;
class Dashboard extends React.Component {
      state = {
        collapsed: false,
      };
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
      onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
      }
      onOk(value) {
        console.log('onOk: ', value);
      }
      
  render() {
    return (
      <div>
        <Layout >

        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 ,height: "60px"  }}>
            <Breadcrumb style={{ margin: '0 18px',lineHeight:"60px" }}>
                <Breadcrumb.Item>HOME</Breadcrumb.Item>
                <Breadcrumb.Item>首页统计</Breadcrumb.Item>
            </Breadcrumb>
          </Header> */}
          <Content style={{ margin: '16px 16px' }}>
            <div style={{minHeight: 360 }}>
             <Row style={{marginLleft: "-12px", marginRight: "-12px"}}>
              <Col xxl={{ span: 12}} sm={{ span: 24}} style={{paddingLeft: "12px", paddingRight: "12px", marginBottom: "24px"}} >
                <Card hoverable="true" style={{display:"table",width:"100%"}} bodyStyle={{padding:"20px 24px 8px",width:"100%",height:"100%"}}>
                  <Meta avatar={<Avatar src="/tongji.png" style={{width:"15px",height:"13px",borderRadius:"0",fontSize:"16px"}}/>} title="会员数据统计"></Meta>
                  <Row style={{marginTop:"16px",marginLeft:"-12px",marginRight:"-12px"}}>
                    <Col xxl={{ span: 12}} sm={{ span: 24}} style={{padding:"12px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    </Col>
                    <Col xxl={{ span: 12}} sm={{ span: 24}} style={{padding:"12px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{padding:"16px",marginTop:"-16px"}} bordered={false}>
                      <div style={{background:"white"}} className={style.small}>
                        <p>注册总数：<span>123456</span></p>
                      </div>
                    </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xxl={{ span: 12}} sm={{ span: 24}} style={{paddingLeft: "12px", paddingRight: "12px", marginBottom: "24px"}} >
              <Card hoverable="true" style={{display:"table",width:"100%"}} bodyStyle={{padding:"12px 24px 8px",width:"100%",height:"100%"}}>
                  <Header style={{background:"white",padding:"0",lineHeight:"24px"}} className={style.rightHeader}>
                  {/* <span></span> */}
                  <DatePicker style={{margin:"0 10px",height:"22px"}} size={"small"} format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" onChange={this.onChange} onOk={this.onOk} />
                  <span>到：</span>
                  <DatePicker style={{margin:"0 10px",height:"22px"}} size={"small"} format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" onChange={this.onChange} onOk={this.onOk} />
                  <Button className={style.latelyTime}>最近30天</Button>
                  </Header>
                  <Row style={{marginTop:"16px",marginLeft:"-12px",marginRight:"-12px"}}>
                    <Col xxl={{ span: 12}} sm={{ span: 24}} style={{padding:"12px 12px",background:"white"}}>
                    <Card style={{background:"#81e7a3"}} bodyStyle={{marginTop:"-16px",padding:0,height:"140px"}} bordered={false}>
                      <div className={style.rightSmall}>
                        <p>23</p>
                        <p>今日访客数</p>
                      </div>
                    </Card>
                    </Col>
                    <Col xxl={{ span: 12}} sm={{ span: 24}} style={{padding:"12px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{marginTop:"-16px",padding:0,height:"140px"}} bordered={false}>
                      <div className={`${style.rightSmall} ${style.rightSmall2}`}>
                        <p>23</p>
                        <p>今日访客数</p>
                      </div>
                    </Card>
                    </Col>
                    {/*  ====================================  */}
                    <Col xxl={{ span: 8}} sm={{ span: 24}} style={{padding:"16px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{marginTop:"-8px",padding:0,height:"140px"}} bordered={false}>
                      <div className={`${style.rightSmall} ${style.rightSmall2}`} style={{background:"#f8c82e"}}>
                        <p>23</p>
                        <p>今日访客数</p>
                      </div>
                    </Card>
                    </Col>
                    <Col xxl={{ span: 8}} sm={{ span: 24}} style={{padding:"16px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{marginTop:"-8px",padding:0,height:"140px"}} bordered={false}>
                      <div className={`${style.rightSmall} ${style.rightSmall2}`} style={{background:"#b0b1f6"}}>
                        <p>23</p>
                        <p>今日访客数</p>
                      </div>
                    </Card>
                    </Col>
                    <Col xxl={{ span: 8}} sm={{ span: 24}} style={{padding:"16px 12px",background:"white"}}>
                    <Card style={{background:"#f8f6f9"}} bodyStyle={{marginTop:"-8px",padding:0,height:"140px"}} bordered={false}>
                      <div className={`${style.rightSmall} ${style.rightSmall2}`} style={{background:"#8fc9fb"}}>
                        <p>23</p>
                        <p>今日访客数</p>
                      </div>
                    </Card>
                    </Col>
                    
                  </Row>
                </Card>
              </Col>
             </Row>



             <Row style={{marginLleft: "-12px", marginRight: "-12px"}}>
              <Col xxl={{ span: 12}} sm={{ span: 24}} style={{paddingLeft: "12px", paddingRight: "12px", marginBottom: "24px"}} >
                <Card hoverable="true" style={{display:"table",width:"100%"}} bodyStyle={{padding:"20px 24px 8px",width:"100%",height:"100%"}} bordered={false}>
                  <Meta avatar={<Avatar src="/tongji.png" style={{width:"15px",height:"13px",borderRadius:"0",fontSize:"16px"}}/>} title="上架商品统计"></Meta>
                  <Row style={{marginTop:"30px",marginLeft:"-12px",marginRight:"-12px",paddingBottom:"30px"}}>
                    {/* ============================== */}
                    <Col xxl={6} sm={12} style={{padding:"0px 12px"}}>
                      <Card className={style.leftTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                        <img src="/static/shopNum.png"/>
                        <p>商品数量</p>
                        <p>258465</p>
                      </Card>
                    </Col>
                    <Col xxl={6} sm={12} style={{padding:"0px 12px"}}>
                      <Card className={style.leftTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                        <img src="/static/userNum.png"/>
                        <p>账号上架数量</p>
                        <p>258465</p>
                      </Card>
                    </Col>
                    <Col xxl={6} sm={12} style={{padding:"0px 12px"}}>
                      <Card className={style.leftTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                        <img src="/static/otherNum.png"/>
                        <p>其他上架数量</p>
                        <p>258465</p>
                      </Card>
                    </Col>
                    <Col xxl={6} sm={12} style={{padding:"0px 12px"}}>
                      <Card className={style.leftTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                        <img src="/static/appearanceNum.png"/>
                        <p>外观上架数量</p>
                        <p>258465</p>
                      </Card>
                    </Col>
                    {/* =============================== */}
                  </Row>
                </Card>
              </Col>
              <Col xxl={{ span: 12}} sm={{ span: 24}} style={{paddingLeft: "12px", paddingRight: "12px", marginBottom: "24px"}} >
              <Card  hoverable="true" style={{display:"table",width:"100%"}} bodyStyle={{padding:"20px 24px 8px",width:"100%",height:"100%"}} bordered={false}>
                <Meta avatar={<Avatar src="/tongji.png" style={{width:"15px",height:"13px",borderRadius:"0",fontSize:"16px"}}/>} title="商家统计"></Meta>
                <Row style={{marginTop:"30px",marginLeft:"-12px",marginRight:"-12px",paddingBottom:"30px"}}>
                  <Col span={24}>
                    <Card className={style.rightTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                      <Row>
                        <Col xxl={12} sm={12} xs={24}>
                          <span>本月成交额：</span><span>121,213,21</span>
                        </Col>
                        <Col xxl={12} sm={12} xs={24}>
                          <span>平台利润：</span><span>453,000</span>
                        </Col>
                      </Row>
                      
                    </Card>
                  </Col>
                  <Col span={24} style={{marginTop:"12px"}}>
                    <Card className={style.rightTwo_one} bodyStyle={{padding:0,width:"100%",height:"100%"}} bordered={false}>
                    <Row>
                        <Col xxl={12} sm={12} xs={24}>
                          <span>本月成交额：</span><span>121,213,21</span>
                        </Col>
                        <Col xxl={12} sm={12} xs={24}>
                          <span>平台利润：</span><span>453,000</span>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Card>
              </Col>
             </Row>
            </div>
          </Content>
        
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default connect()(Dashboard)