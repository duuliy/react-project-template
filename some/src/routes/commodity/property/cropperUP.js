import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import PropTypes from 'prop-types'
import Cropper from 'react-cropper';
import { request, config } from 'utils'
const { api } = config
const { uploadfile,imgSrc } = api
/* global FileReader */

const src = 'img/child.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src:imgSrc+''+ this.props.imgSrc,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }
  static defaultProps = {
    fatherImg:()=>{}
  }
  static propTypes = {
    fatherImg: PropTypes.func
  }
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    var myFormData = new FormData()
    const dates = {
      file:e.target.files[0],
      
  }
    myFormData.append('file',e.target.files[0])
    myFormData.append('custom',{type:'property'})
    
    const reader = new FileReader(files[0]);
            reader.onload = () => {
              this.setState({ src: reader.result });
            };
            reader.readAsDataURL(files[0])
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    var myFormData = new FormData()
    myFormData.append('file',this.cropper.getCroppedCanvas().toDataURL())
    myFormData.append('custom',{type:'property'})
    request({
        url: uploadfile,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
          data:myFormData,
      }).then((e)=>{
        if(e.status == 1){
            // this.setState({ src: e.data.url });
            // const reader = new FileReader(e.data.url);
            // reader.onload = () => {
            //   this.setState({ src: reader.result });
            // };
            // reader.readAsDataURL(files[0])
            this.props.fatherImg(e.data.name)
        }
    }).catch((err)=>{
        console.log(err)
    })
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  
  }

  useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%' }}>
          <input type="file"  onChange={this.onChange} />
          {/* <button onClick={this.useDefaultImage}>Use default img</button> */}
          {/* <br /> */}
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={1.28 / 1}
            // preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            {/* <h1>Preview</h1> */}
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              {/* <span>Crop</span> */}
              <button onClick={this.cropImage} style={{ float: 'right' }}>
               选择图片
              </button>
            </h1>
            <img style={{ width: '100%' }} src={this.state.cropResult} alt="未选择图片" />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}