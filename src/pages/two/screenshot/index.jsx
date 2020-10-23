import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import OnLineMap from '../../one/onLineMap'
import ImageEditor from 'image-editor-little'

const Screenshot = () => {
  const PrefixCls = 'Screenshot'

  const [editSrc, setEditSrc] = useState('https://miro.medium.com/max/3200/1*hLM2qGfy0VOTiyuyE3pOBA.png')

  //img转canvas
  const convertImageToCanvas = () => {
    // 创建canvas DOM元素，并设置其宽高和图片一样
    var canvas = document.getElementById('myCanvas')
    var image = document.getElementById('tulip')
    canvas.getContext('2d').drawImage(image, 10, 10, 100, 100)
    return canvas
  }

  //canvas转img
  const convertCanvasToImage = canvas => {
    //新Image对象，可以理解为DOM
    // var image = new Image()
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    var image = document.getElementById('myTulip')
    image.src = canvas.toDataURL('image/png')
    document.getElementById('save_href').href = canvas.toDataURL('image/png')
    // return image
  }

  const getImage = () => convertCanvasToImage(convertImageToCanvas())

  const visibleChange = () => {
    getImage()
  }

  useEffect(() => {
    convertImageToCanvas()

    //截图
    html2canvas(document.querySelector('#capture')).then(canvas => {
      // var image = document.getElementById('myTulip2')
      // image.src = canvas.toDataURL('image/png')

      // document.body.appendChild(canvas)
      setEditSrc(canvas.toDataURL('image/png'))
      document.getElementById('save_href2').href = canvas.toDataURL('image/png')
    })
  }, [])

  return (
    <>
      截图
      <img id="tulip" style={{ width: 50, height: 50 }} src={require('@a/images/logo.jpg')} alt="The Tulip" />
      <canvas id="myCanvas" width="500" height="300" style={{ border: '1px solid #d3d3d3', background: '#ffffff' }}></canvas>
      <button onClick={visibleChange}>获得image</button>
      <a href="" download="canvas_love.png" id="save_href">
        <img id="myTulip" src="" alt="The Canvas" />
      </a>
      react 截图
      {/* <ImageEditor id="myTulip2" width={500} height={500} src="https://miro.medium.com/max/3200/1*hLM2qGfy0VOTiyuyE3pOBA.png" /> */}
      <ImageEditor id="myTulip2" width={500} height={500} src={editSrc} />
      html2cancas
      <div id="capture" style={{ position: 'relative', padding: '10px', height: '1000px', background: '#f5da55' }}>
        <h4 style={{ color: '#000' }}>Hello world!</h4>
        <h4 style={{ position: 'absolute', bottom: 0 }}>end!</h4>
        {/* <OnLineMap /> */}
      </div>
      <a href="" download="canvas_love.png" id="save_href2">
        下载canvas
      </a>
    </>
  )
}

export default Screenshot
