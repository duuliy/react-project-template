import React, { PureComponent } from 'react';
import { connect } from 'dva';
import './style.less';
import { Example } from '../../../components/index.js'
import cls from "classnames";



// const Products = (props) => (
//   // <h2>List of Products</h2>
//   <div className={`ggg`}>
//     ccc
//     <p>55555555</p>
//   </div>
// );

// export default Products


class Products2 extends PureComponent {

  static states =()=>{
   console.log(999)
 }
}

 class Products extends PureComponent {


  state = {
    PrefixCls: "products",
    data:[
      "a","b","c","d"
    ]
	};
  bbb=()=>{ 
    console.log(Products2.states())

  }

  ggg=()=>{
    const {dispatch} =this.props;
    console.log('onDeleteItem')
    setTimeout(()=>{
        dispatch({type: 'productsModel/add'})
    },1000)
  }

  render(){
    const { count } = this.props;
    const { prefixCls } = this.state;

    return(
      <div className={`${prefixCls} ggg`}>
             {prefixCls}  
         <p onClick={this.bbb}>55555555</p>
         <span>{count} </span>
         <Example onDeleteItem={()=>{this.ggg()}} arr={this.state.data}/>
      </div>
      )
  }

  
}


Products.propTypes = {
};


export default connect(({productsModel})=>({count:productsModel.count}))(Products);
