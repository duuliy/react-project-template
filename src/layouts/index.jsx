import React ,{PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter'
import { NavLink } from 'dva/router';
import BaseLayout from './BaseLayout'
import { LocaleProvider } from 'antd';
import PropTypes from 'prop-types'
import Context from './MenuContext';
import { ContainerQuery } from 'react-container-query';
import {validCtr} from '@u/conversion.js'
import {formatMsg,setLocal,g} from '@u/user.js'
import cls from 'classnames';
import {i18n} from '@u/user.js';
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import moment from 'moment';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

@connect(({ common, loading }) => ({ common, loading }))
@withRouter
class Layout extends PureComponent {
  state = {
    catalogs: {},

  };

  render() {
    const {children ,location,language } = this.props;
    if (location.pathname === '/404'||location.pathname ==='/register') {
      return <Fragment>{ children }</Fragment>
    }

    return (
      <Fragment>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider>
              <BaseLayout className={cls(params)}>{children}</BaseLayout>
            </Context.Provider>
            )}
         </ContainerQuery> 
      </Fragment>
    );
  }

  componentDidMount(){
    // global.setLocal('zh-CN');
    global.setLocal(i18n());
  }

  componentDidUpdate(){
  }
}

Layout.propTypes = {
  language:PropTypes.string
};

export default connect(({common})=>({language}))(Layout);
