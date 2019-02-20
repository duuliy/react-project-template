import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import './Breakcrumbs.less';

const routes = [
  { path: '/', breadcrumb: '' },
  { path: '/manage', breadcrumb: '基础数据' },
  { path: '/statireport', breadcrumb: '统计报表' },
  { path: '/manage/organiZation', breadcrumb: '组织机构' },
  { path: '/manage/userStati', breadcrumb: '用户信息' },
  { path: '/manage/rightsManagement', breadcrumb: '权限管理' },
  { path: '/manage/encryptedDogManagement', breadcrumb: '加密狗管理' },
  { path: '/manage/topUpCenter', breadcrumb: '充值中心' },
  { path: '/statireport/userTranslationDetailStatistics', breadcrumb: '用户翻译详情统计' },
  { path: '/statireport/reswordcount', breadcrumb: '剩余字数' },
  { path: '/statireport/corporateTranslationStatistics', breadcrumb: '公司翻译统计' },
  { path: '/statireport/userTranslationStatistics', breadcrumb: '用户翻译统计' }
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) =>(
  <div className={'Breakcrumbs'} style={{ padding:'20px',borderBox:'box-sizing',background: 'white' }}>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key} >
        {/* <NavLink to={breadcrumb.props.match.url} style={{ color:'black' }}> */}
          {/* {breadcrumb.props.children} */}
          {/* {BreakcrumbTitle(breadcrumb)} */}
          {breadcrumb}
        {/* </NavLink> */}
        {(index >0)&& (index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));
