import React, { PureComponent } from 'react';
import DynamicTest from './DynamicTest';

export default class OnLineMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      PrefixCls: 'OnLineMap',
    };
  }
  render() {
    return (
      <div>
        <div id="container" style={{ width: '100%', height: '500px' }}></div>
        <DynamicTest />
      </div>
    );
  }
  componentDidMount() {
    const map = new AMap.Map('container', {
      zoom: 11, //级别
      center: [104.066641, 30.657814], //中心点坐标
      // viewMode: '3D', //使用3D视图
    });

    AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
      if (!PathSimplifier.supportCanvas) {
        alert('当前环境不支持 Canvas！');
        return;
      }

      var pathSimplifierIns = new PathSimplifier({
        zIndex: 100,
        autoSetFitView: false,
        map: map, //所属的地图实例

        getPath: function(pathData, pathIndex) {
          var points = pathData.points,
            lnglatList = [];

          for (var i = 0, len = points.length; i < len; i++) {
            lnglatList.push(points[i].lnglat);
          }

          return lnglatList;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex) {
          if (pointIndex >= 0) {
            //point
            return pathData.name + '，' + pathData.points[pointIndex].name;
          }

          return pathData.name + '，点数量' + pathData.points.length;
        },
        renderOptions: {
          renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
        },
      });

      window.pathSimplifierIns = pathSimplifierIns;

      //设置数据
      pathSimplifierIns.setData([
        {
          name: '罪犯分子活动轨迹',
          points: [
            {
              name: '出发',
              lnglat: [103.953491, 30.561485],
            },
            {
              name: '抢劫地点',
              lnglat: [103.995401, 30.650726],
            },
            {
              name: '杀人地点',
              lnglat: [104.149381, 30.676714],
            },
            {
              name: '放火地点',
              lnglat: [104.059645, 30.552137],
            },
            {
              name: '开始逃跑了',
              lnglat: [104.074194, 30.696938],
            },
            {
              name: '逃跑地点1',
              lnglat: [106.555877, 29.566701],
            },
          ],
        },
      ]);

      //选中路线0
      pathSimplifierIns.setSelectedPathIndex(0);

      pathSimplifierIns.on('pointClick', function(e, info) {
        console.log('Click: ' + info.pathData.points[info.pointIndex].name);
      });
    });
  }
}
