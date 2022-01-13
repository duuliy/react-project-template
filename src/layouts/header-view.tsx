import * as React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Header } = Layout 

const HeaderView = ({ name }: { name: string }) => {
  return <Header>{name}</Header>
}

HeaderView.propTypes = {
  name: PropTypes.string
}


export default HeaderView