import React, { PureComponent } from 'react';
import './style.less';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class LeafletMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      PrefixCls: 'LeafletMap',
    };
  }
  render() {
    const { PrefixCls } = this.state;
    return (
      <div className={PrefixCls}>
        <div id={`${PrefixCls}-map`}></div>
      </div>
    );
  }
  componentDidMount() {
    var map = L.map(`${this.state.PrefixCls}-map`).setView([30.652084, 104.0597], 13);

    const url_normal = 'http://localhost:3001/788865972/{z}/{x}/{y}';

    L.tileLayer(url_normal, {
      minZoom: 3,
      maxZoom: 20,
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    var latlngs = [
      [30.552084, 104.059769],
      [30.650726, 103.995401],
      [30.676714, 104.149381],
    ];
    var polyline = L.polyline(latlngs, {
      color: 'red',
    }).addTo(map);

    latlngs.forEach(v =>
      L.circleMarker(v, {
        radius: 2,
        color: 'green',
        fillOpacity: 1,
      }).addTo(map),
    );
  }
}
