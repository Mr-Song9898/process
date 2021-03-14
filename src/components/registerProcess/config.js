export const mockData = [];

export const defaultNodeConfig = {
  name: '默认节点',
  collapsed: false,
  count: 123456,
  label: '138.00',
  rate: 0.123,
  status: 'B',
  currency: 'Yuan',
  variableName: 'V2',
  variableValue: 0.27,
  variableUp: true,
  type: 'flow-rect',
  x: 600,
  y: 200,
};

export const NodeModelMap = {
  begin: {
    ...defaultNodeConfig,
    name: '开始节点',
    nodetype: 'begin',
  },
  process: {
    ...defaultNodeConfig,
    name: '决策节点',
    nodetype: 'process',
  },
  condition: {
    ...defaultNodeConfig,
    name: '条件节点',
    nodetype: 'condition',
  },
  end: {
    ...defaultNodeConfig,
    name: '结束节点',
    nodetype: 'end',
  }
};

export const colors = {
  B: '#5B8FF9',
  R: '#F46649',
  Y: '#EEBC20',
  G: '#5BD8A6',
  DI: '#A7A7A7',
};

//  组件props
export const prop = {
  data: mockData,
  config: {
    padding: [20, 50],
    defaultLevel: 3,
    defaultZoom: 0.8,
    modes: { default: ['zoom-canvas', 'drag-canvas', 'drag-node'] },
    // fitView: true,
    animate: true,
    defaultNode: {
      type: 'flow-rect',
    },
    defaultEdge: {
      // type: 'flow-cubic',
      type: 'cubic-horizontal',
      // type: 'polyline',
      // type: 'single-line',
      style: {
        stroke: '#CED4D9',
        lineWidth: 5
      },
    },
    layout: {
      type: 'indented',
      direction: 'LR',
      dropCap: false,
      indent: 300,
      getHeight: () => {
        return 60;
      },
    },
  },
};
