import React ,{PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter'
import { NavLink } from 'dva/router';
import BaseLayout from './BaseLayout'
import { LocaleProvider } from 'antd';
import PropTypes from 'prop-types'
// import { I18nProvider } from '@lingui/react'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import moment from 'moment';


const langs = {
  'zh_CN': zh_CN,
  'en_US': en_US,
}

@connect(({ common, loading }) => ({ common, loading }))
@withRouter
class Layout extends PureComponent {
  state = {
    catalogs: {},
    locale: zh_CN
  };
  
  //  change=(lang)=>{
  //   // this.setState({
  //   //   language: lang,
  //   // });
  // }


  render() {
    const {children ,location,language } = this.props;
    const {locale } = this.state;
    console.log(language)
    // const { language } = this.state;
    if (location.pathname === '/login') {
      return <Fragment>{ children }</Fragment>
    }
    // let lang=(language==='zh_CN'?zh_CN:en_US)

    return (
      // <LocaleProvider locale={languages[language]}>
      <LocaleProvider  locale={locale}>
        {/* <I18nProvider language={language} catalogs={catalogs}> */}
          <BaseLayout>{children}</BaseLayout>
        {/* </I18nProvider> */}
      </LocaleProvider>
    );
  }

  componentDidUpdate(){
    const {language } = this.props;
    const {locale } = this.state;
    console.log(999)
    this.setState({
      locale: (!language==='zh_CN'?en_US:zh_CN),
    });
  }
}

Layout.propTypes = {
  language:PropTypes.string
};

export default connect(({common})=>({language:common.language}))(Layout);
