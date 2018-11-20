import NavLink from 'umi/navlink';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import './Breakcrumbs.less';

const routes = [
  { path: '/', breadcrumb: '' },
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <div className={'Breakcrumbs'} style={{ padding:'20px 0 0 20px' }}>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key} >
        <NavLink to={breadcrumb.props.match.url} style={{ color:'black' }}>
          {breadcrumb}
        </NavLink>
        {(index >0)&& (index < breadcrumbs.length - 1) && <i> / </i>}
      </span>
    ))}
  </div>
));