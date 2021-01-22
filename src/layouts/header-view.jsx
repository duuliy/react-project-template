import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Header } = Layout

const HeaderView = ({ name }) => {
  return <Header>{name}</Header>
}

HeaderView.propTypes = {
  name: PropTypes.string
}


export default HeaderView