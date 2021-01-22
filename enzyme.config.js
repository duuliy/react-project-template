import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17' //后续官方出来后升级到17
import React from 'react'

if (typeof window !== 'undefined') {
  window.React = React;
}

configure({ adapter: new Adapter() })