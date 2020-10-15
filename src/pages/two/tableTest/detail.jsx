import { useState, useEffect } from 'react'
import { DetailFiedls } from '@c/index'
import { Button } from 'antd'

const DetailTest = () => {
  const PrefixCls = 'tableTestDetail'
  const fields = [
    { key: 'categoryModelName', name: '类型', showTips: false },
    { key: 'manufacturer', name: '厂商' },
    { key: 'name', name: '名称' },
    { key: 'version', name: '版本' },
    { key: 'categoryModelName1', name: '类型', showTips: false },
    { key: 'manufacturer1', name: '厂商', render: () => <Button>按钮</Button> },
    { key: 'name1', name: '名称' },
    { key: 'version1', name: '版本' },
  ]
  const data = {
    categoryModelName: 666,
    manufacturer: 666,
    name: 666,
    version: 666,
    categoryModelName1: 666,
    manufacturer1: 666,
    name1: 666,
    version1: 666,
  }

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
  }, [])

  return (
    <>
      详情
      <DetailFiedls fieldList={fields} data={data} column={6} />
      666
      <img id="tulip" style={{ width: 50, height: 50 }} src={require('@a/images/logo.jpg')} alt="The Tulip" />
      <canvas id="myCanvas" width="500" height="300" style={{ border: '1px solid #d3d3d3', background: '#ffffff' }}></canvas>
      <button onClick={visibleChange}>获得image</button>
      <a href="" download="canvas_love.png" id="save_href">
        <img id="myTulip" src="" alt="The Canvas" />
      </a>
    </>
  )
}

export default DetailTest
