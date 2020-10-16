/**
 * 此处文件为菜单项，路径必须与pages 一致 （除：.umi、document.ejs和错误处理页面）
 * 如果设置了 show: false 时，此菜单不在显示，但会出现在面包屑中
 */
import ACCSS from '@a/js/access'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'

export default [
  {
    key: '/one',
    name: 'Navigation one',
    path: '/one',
    tag: ACCSS.one,
    show: true,
    icon: <UserOutlined />,
    children: [
      {
        key: '/one/onLineMap',
        name: 'onLineMap',
        tag: ACCSS.oneOnLineMap,
        show: true,
        path: '/one/onLineMap',
        children: [
          {
            key: '/one/onLineMap/detail',
            name: '详情页面',
            tag: ACCSS.oneOffLineMapDetail,
            path: '/one/onLineMap/detail',
            show: false,
          },
        ],
      },
      {
        key: '/one/offlineMap',
        name: 'offlineMap',
        tag: ACCSS.oneOffLineMap,
        show: true,
        path: '/one/offlineMap',
      },
    ],
  },
  {
    key: '/two',
    name: 'Navigation two',
    path: '/two',
    tag: ACCSS.two,
    show: true,
    icon: <VideoCameraOutlined />,
    children: [
      {
        key: '/two/leafletMap',
        name: 'leafletMap',
        tag: ACCSS.twoLeafLetMap,
        show: true,
        path: '/two/leafletMap',
      },
      {
        key: '/two/tableTest',
        name: 'tableTest',
        tag: ACCSS.twoTableTest,
        show: true,
        path: '/two/tableTest',
        children: [
          {
            key: '/two/tableTest/detail',
            name: '详情页面',
            tag: ACCSS.twoTableTestDetail,
            path: '/two/tableTest/detail',
            show: false,
          },
          {
            key: '/two/tableTest/edit',
            name: '编辑页面',
            tag: ACCSS.twoTableTestEdit,
            path: '/two/tableTest/edit',
            show: false,
          },
        ],
      },
      {
        key: '/two/visualization',
        name: '可视化',
        tag: ACCSS.twoVisualization,
        path: '/two/visualization',
        show: true,
      },
    ],
  },
  {
    key: '/four',
    name: 'Navigation four',
    path: '/four',
    tag: ACCSS.four,
    show: true,
    icon: <UploadOutlined />,
    children: [
      {
        key: '25',
        name: 'Option 13',
        tag: ACCSS.fourOption13,
        path: '',
        show: true,
      },
    ],
  },
]
