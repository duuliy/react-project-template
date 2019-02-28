
import React, { Fragment } from 'react';
import {shallow,mount,render} from 'enzyme';
import  Drag  from '../Drag.js';
import renderer from 'react-test-renderer';

describe('<Drag/>',  ()=> {
  const corpLangDirecInfo={
    title:"测试",
    visible:true
  }
  it('shoulder render a Drag', function () {
    let app = renderer.create(
        <Fragment>
          <Drag gba={corpLangDirecInfo}/>
        </Fragment>
        ).toJSON();
    expect(app).toMatchSnapshot();
  });
})


