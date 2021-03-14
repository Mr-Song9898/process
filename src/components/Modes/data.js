export const data = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
    },
    {
      id: 'node2',
      x: 300,
      y: 200,
    },
    {
      id: 'node3',
      x: 300,
      y: 300,
    },
  ],
  edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1',
    },
  ],
};

export const selectData =  [
  {
    id: 'default',
    value: 'default',
    label: '默认'
  },
  {
    id: 'addNode',
    value: 'addNode',
    label: '添加节点'
  },
  {
    id: 'addEdge',
    value: 'addEdge',
    label: '添加边',
  },
];