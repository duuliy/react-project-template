import { useEffect } from 'react'
import cytoscape from 'cytoscape'
import './style.less'

const Cytoscape = () => {
  useEffect(() => {
    var cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          css: {
            width: 50,
            height: 50,
            'background-color': '#61bffc',
            content: 'data(id)',
          },
        },
      ],
      elements: {
        nodes: [{ data: { id: 'A' } }, { data: { id: 'B' } }, { data: { id: 'C' } }, { data: { id: 'D' } }, { data: { id: 'E' } }, { data: { id: 'F' } }, { data: { id: 'G' } }, { data: { id: 'H' } }, { data: { id: 'J' } }, { data: { id: 'K' } }, { data: { id: 'L' } }, { data: { id: 'M' } }],
        edges: [
          { data: { id: 'e1', source: 'A', target: 'B' } },
          { data: { id: 'e2', source: 'A', target: 'C' } },
          { data: { id: 'e3', source: 'B', target: 'D' } },
          { data: { id: 'e4', source: 'C', target: 'D' } },
          { data: { id: 'e5', source: 'C', target: 'E' } },
          { data: { id: 'e6', source: 'C', target: 'F' } },
          { data: { id: 'e7', source: 'D', target: 'G' } },
          { data: { id: 'e8', source: 'D', target: 'H' } },
          { data: { id: 'e9', source: 'E', target: 'H' } },
          { data: { id: 'e10', source: 'E', target: 'J' } },
          { data: { id: 'e11', source: 'F', target: 'J' } },
          { data: { id: 'e12', source: 'F', target: 'K' } },
          { data: { id: 'e13', source: 'G', target: 'L' } },
          { data: { id: 'e14', source: 'H', target: 'L' } },
          { data: { id: 'e15', source: 'H', target: 'M' } },
          { data: { id: 'e16', source: 'J', target: 'M' } },
        ],
      },
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
        fit: true,
      },
    })
  }, [])

  return (
    <div className="hhh">
      87878
      <div id="cy"></div>
    </div>
  )
}

export default Cytoscape
