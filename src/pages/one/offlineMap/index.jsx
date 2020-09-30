import React, { PureComponent } from 'react'
import './style.less'
import { History } from 'history'

export default class OfflineMap extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PrefixCls: 'OfflineMap',
    }
  }

  jumpDeatil = () => {
    this.props.history.push('/one/offLineMap/detail')
  }

  render() {
    const { PrefixCls } = this.state
    return (
      <div className={PrefixCls}>
        <div id={`${PrefixCls}-map`}></div>
        <div onClick={this.jumpDeatil}>去详情</div>
      </div>
    )
  }
  componentDidMount() {
    BM.Config.HTTP_URL = 'http://localhost:9000'

    // 在ID为map的元素中实例化一个地图，并设置地图的ID号为 bigemap.baidu-map，ID号程序自动生成，无需手动配置，并设置地图的投影为百度地图 ，中心点，默认的级别和显示级别控件
    let map = BM.map(`${this.state.PrefixCls}-map`, 'bigemap.amap-map', {
      center: [30.552084, 104.059769],
      zoom: 11,
      zoomControl: true,
      attributionControl: false,
    })
    let latlngs = [
      [30.552084, 104.059769],
      [30.650726, 103.995401],
      [30.676714, 104.149381],
    ]
    let polyline = BM.polyline(latlngs, { color: 'red' }).addTo(map)
    // 让地图适配当前的线段
    map.fitBounds(polyline.getBounds())

    // 默认半径是10，具体API详情请参见 http://www.bigemap.com/offlinemaps/api/#circlemarker
    latlngs.forEach(v => BM.circleMarker(v, { radius: 2, color: 'green', fillOpacity: 1 }).addTo(map))
  }
}
