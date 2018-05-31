import { Upload, Icon, Modal } from 'antd';
import { request, config } from 'utils'
import styles from './index.less'
const { api } = config
const { uploadfile,imgSrc } = api

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
        {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }
    ],
  };
  componentDidMount(){
    console.log(uploadfile)
    console.log(imgSrc)
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log(file)
    // this.setState({
    //   previewImage: file.url || file.thumbUrl,
    //   previewVisible: true,
    // });
  }

  handleChange = ({ fileList }) => {this.setState({ fileList });console.log(fileList)}

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          style={{width:'200px'}}
          action="/api/v2/uploadfile"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}



    // .ant-upload-list-picture-card .ant-upload-list-item {
    //     float: left;
    //     width: 204px;
    //     height: 104px;
    //     margin: 0 8px 8px 0;
    //   }

