import { useEffect } from 'react'
import cytoscape from 'cytoscape'
import contextMenus from 'cytoscape-context-menus'
import 'cytoscape-context-menus/cytoscape-context-menus.css'
import './style.less'

const Cytoscape = () => {
  const options = {
    evtType: 'cxttap',
    menuItems: [
      {
        id: 'remove', // ID of menu item
        content: 'remove', // Display content of menu item
        tooltipText: 'remove', // Tooltip text for menu item
        image: { src: 'remove.svg', width: 12, height: 12, x: 6, y: 4 }, // menu icon
        // Filters the elements to have this menu item on cxttap
        // If the selector is not truthy no elements will have this menu item on cxttap
        selector: 'node, edge',
        onClickFunction: function() {
          // The function to be executed on click
          console.log('remove element')
        },
        disabled: false, // Whether the item will be created as disabled
        show: true, // Whether the item will be shown or not
        hasTrailingDivider: true, // Whether the item will have a trailing divider
        coreAsWell: false, // Whether core instance have this item on cxttap
        submenu: [], // Shows the listed menuItems as a submenu for this item. An item must have either submenu or onClickFunction or both.
      },
    ],
  }

  useEffect(() => {
    cytoscape.use(contextMenus)
    let cy = cytoscape({
      name: 'duuliy',
      container: document.getElementById('cy'), //container的值为DOM容器，表示显示图表的位置
      style: [
        //设置样式的样式表
        {
          selector: 'node', //设置节点样式
          css: {
            content: 'data(name)',
            color: 'white',
            'text-valign': 'center',
            'text-outline-color': '#6699FF',
            'background-color': '#6699FF',
            height: 60,
            width: 60,
            'font-size': '14px',
            'font-weight': 'bold',
          },
        },
        {
          selector: 'edge', //设置边的样式
          css: {
            content: 'data(relationship)',
            'curve-style': 'bezier', //曲线类型为贝塞尔曲线
            'target-arrow-shape': 'triangle',
            'line-color': '#CCCCCC',
            width: 1,
            'font-size': '14px',
          },
        },
      ],

      elements: {
        //初始化元素
        nodes: [
          //节点数据
          { data: { id: 'n1', name: '江户川柯南' } },
          { data: { id: 'n2', name: '毛利兰' } },
          { data: { id: 'n3', name: '工藤新一' } },
          { data: { id: 'n4', name: '工藤优作' } },
          { data: { id: 'n5', name: '工藤有希子' } },
          { data: { id: 'n6', name: '毛利小五郎' } },
          { data: { id: 'n7', name: '妃英理' } },
          { data: { id: 'n8', name: '铃木园子' } },
          { data: { id: 'n9', name: '服部平次' } },
          { data: { id: 'n10', name: '远山和叶' } },
          { data: { id: 'n11', name: '怪盗基德' } },
          { data: { id: 'n12', name: '阿笠博士' } },
          { data: { id: 'n13', name: '目暮警官' } },
          { data: { id: 'n14', name: '高木警官' } },
          { data: { id: 'n15', name: '佐藤警官' } },
          { data: { id: 'n16', name: '白鸟警官' } },
          { data: { id: 'n17', name: '琴酒' } },
          { data: { id: 'n18', name: '贝尔摩德' } },
          { data: { id: 'n19', name: '伏特加' } },
          { data: { id: 'n20', name: '灰原哀' } },
          { data: { id: 'n21', name: '赤井秀一' } },
          { data: { id: 'n22', name: '朱蒂老师' } },
          { data: { id: 'n23', name: '小岛元太' } },
          { data: { id: 'n24', name: '吉田步美' } },
          { data: { id: 'n25', name: '圆谷光彦' } },
          { data: { id: 'n26', name: '中森警官' } },
          { data: { id: 'n27', name: '中森青子' } },
          { data: { id: 'n28', name: '安室透' } },
        ],
        edges: [
          //边的数据
          { data: { id: 'e1', relationship: '照顾xxx', source: 'n2', target: 'n2' } },
          { data: { id: 'e2', relationship: '情侣', source: 'n3', target: 'n2' } },
          { data: { id: 'e3', relationship: '父子', source: 'n3', target: 'n4' } },
          { data: { id: 'e4', relationship: '母子', source: 'n3', target: 'n5' } },
          { data: { id: 'e5', relationship: '父女', source: 'n2', target: 'n6' } },
          { data: { id: 'e6', relationship: '母女', source: 'n2', target: 'n7' } },
          { data: { id: 'e7', relationship: '好友', source: 'n2', target: 'n8' } },
          { data: { id: 'e8', relationship: '好友', source: 'n3', target: 'n9' } },
          { data: { id: 'e9', relationship: '情侣', source: 'n10', target: 'n9' } },
          { data: { id: 'e10', relationship: '亦敌亦友', source: 'n3', target: 'n11' } },
          { data: { id: 'e11', relationship: '邻居', source: 'n3', target: 'n12' } },
          { data: { id: 'e12', relationship: '原同事', source: 'n13', target: 'n6' } },
          { data: { id: 'e13', relationship: '上司', source: 'n13', target: 'n14' } },
          { data: { id: 'e14', relationship: '相恋', source: 'n15', target: 'n14' } },
          { data: { id: 'e15', relationship: '单相思', source: 'n16', target: 'n15' } },
          { data: { id: 'e16', relationship: '寻找下落', source: 'n17', target: 'n3' } },
          { data: { id: 'e17', relationship: '同伙', source: 'n17', target: 'n18' } },
          { data: { id: 'e18', relationship: '上司', source: 'n17', target: 'n19' } },
          { data: { id: 'e19', relationship: '收留', source: 'n12', target: 'n20' } },
          { data: { id: 'e20', relationship: '追查', source: 'n21', target: 'n18' } },
          { data: { id: 'e21', relationship: 'FBI同事', source: 'n21', target: 'n22' } },
          { data: { id: 'e22', relationship: '同学', source: 'n1', target: 'n23' } },
          { data: { id: 'e23', relationship: '同学', source: 'n1', target: 'n24' } },
          { data: { id: 'e24', relationship: '同学', source: 'n1', target: 'n25' } },
          { data: { id: 'e25', relationship: '情侣', source: 'n27', target: 'n11' } },
          { data: { id: 'e26', relationship: '父女', source: 'n27', target: 'n26' } },
          { data: { id: 'e27', relationship: '部下', source: 'n28', target: 'n17' } },
          { data: { id: 'e28', relationship: '追捕', source: 'n26', target: 'n11' } },
          { data: { id: 'e29', relationship: '缩小', source: 'n3', target: 'n1' } },
          { data: { id: 'e30', relationship: '夫妻', source: 'n4', target: 'n5' } },
          { data: { id: 'e31', relationship: '夫妻', source: 'n6', target: 'n7' } },
          { data: { id: 'e32', relationship: '同事', source: 'n16', target: 'n13' } },
          { data: { id: 'e33', relationship: '背叛', source: 'n20', target: 'n17' } },
          { data: { id: 'e34', relationship: '师傅', source: 'n6', target: 'n28' } },
          { data: { id: 'e35', relationship: '对手', source: 'n28', target: 'n21' } },
        ],
      },
      //设置布局
      layout: {
        name: 'cose', //布局方式 ｜ avsdf
      },
    })

    // 监听节点的点击事件
    cy.on('tap', 'node', function(evt) {
      var node = evt.target
      console.log(evt)
      console.log('node ' + node.id())
    })

    cy.on('tap', 'edges', function(evt) {
      var node = evt.target
      console.log('edges ' + node.id())
    })

    //右箭
    cy.on('cxttap', 'node', function(evt) {
      var node = evt.target
      console.log('node ' + node.id())
    })

    var instance = cy.contextMenus(options)
  }, [])

  return (
    <div className="hhh">
      87878
      <div id="cy"></div>
    </div>
  )
}

export default Cytoscape
