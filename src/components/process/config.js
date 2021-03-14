export const SOURCE_NODE_DATA = [
  {
    id: 'begin',
    type: 'rect',
    shape: 'rect',
    label: '开始',
    style: {
      radius: 15,
    },
    x: 150,
    y: 150,
    stateStyles: {
      'node-name': 'begin',
    },
    isSource: true,
    customAttributes: {
      nodeType: 'begin',
    }
  },
  {
    id: 'execute',
    type: 'rect',
    shape: 'rect',
    label: '流程',
    x: 150,
    y: 250,
    stateStyles: {
      'node-name': 'execute',
    },
    isSource: true,
    customAttributes: {
      nodeType: 'process',
    }
  },
  {
    id: 'contain',
    type: 'diamond',
    shape: 'diamond',
    label: '条件',
    size: [100, 60],
    x: 150,
    y: 350,
    style: {
      radius: 10,
    },
    stateStyles: {
      'node-name': 'contain',
    },
    isSource: true,
    customAttributes: {
      nodeType: 'condition',
    }
  },
  {
    id: 'end',
    type: 'rect',
    shape: 'rect',
    label: '结束',
    style: {
      radius: 15,
    },
    x: 150,
    y: 450,
    stateStyles: {
      'node-name': 'end',
    },
    isSource: true,
    customAttributes: {
      nodeType: 'end',
    }
  },
];

// 锚点的位置 [[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]]
export const defaultAnchorPoints = [
  [0.5, 0, {type: 'circle', shape: 'in', style: {stroke: 'red', fill: 'white'}}],
  [1, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
  [0.5, 1, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}],
  [0, 0.5, {type: 'rect', shape: 'out', style: {stroke: 'blue', fill: 'white'}}]
];

// 锚点配置 - 展示
export const showLinkPoints = {
  top: true,
  right: true,
  bottom: true,
  left: true,
  size: 12,
  lineWidth: 2,
  fill: '#fff',
  stroke: '#1890FF',
  type: 'rect',
};

// 锚点配置 - 隐藏
export const hideLinkPoints = {
  top: false,
  right: false,
  bottom: false,
  left: false,
};