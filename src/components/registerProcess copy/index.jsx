/**
 * 2021-03-13 20:39 备份
 * 自定义节点 添加 删除
 */
import React, { Fragment } from 'react';
import { Col, Row, Space, Button } from 'antd';
import G6 from '@antv/g6';
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import {
  prop,
  colors,
  defaultConfig,
  defaultNodeConfig,
} from './config';
import { NodeTooltips, NodeMenu, CanvasMenu } from './component'

class RegisterProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdgeTooltip: false,
      showNodeTooltip: true,
      showNodeMenu: false,
      showCanvasMenu: false,
      nodeMenuX: 0,
      nodeMenuY: 0,
      canvasMenuX: 100,
      canvasMenuY: 100,

      nodeDetailVisible: false,
      currentNodeInfo: {},
      currentEdgeInfo: {},
    };
  }
  componentDidMount() {
    // 初始化G6的自定义事件
    this.registerFn();
    // G6的graph实例需要DOM容器渲染完成才能使用，放在componentDidMount中
    this.renderGraph();
  }

//自定义节点、边
  registerFn = () => {
    G6.registerNode(
      'flow-rect',
      {
        shapeType: 'flow-rect',
        draw(cfg, group) {
          const {
            name = '',
            variableName,
            variableValue,
            variableUp,
            label,
            collapsed,
            currency,
            status,
            rate,
          } = cfg;
          const grey = '#CED4D9';
          // 逻辑不应该在这里判断
          const rectConfig = {
            width: 202,
            height: 60,
            lineWidth: 1,
            fontSize: 12,
            fill: '#fff',
            radius: 4,
            stroke: grey,
            opacity: 1,
          };
  
          const nodeOrigin = {
            x: -rectConfig.width / 2,
            y: -rectConfig.height / 2,
          };
  
          const textConfig = {
            textAlign: 'left',
            textBaseline: 'bottom',
          };
  
          const rect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: nodeOrigin.y,
              ...rectConfig,
            },
          });
  
          const rectBBox = rect.getBBox();
  
          // label title
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: 20 + nodeOrigin.y,
              text: name.length > 28 ? name.substr(0, 28) + '...' : name,
              fontSize: 12,
              opacity: 0.85,
              fill: '#000',
              cursor: 'pointer',
            },
            name: 'name-shape',
          });
  
          // price
          const price = group.addShape('text', {
            attrs: {
              ...textConfig,
              x: 12 + nodeOrigin.x,
              y: rectBBox.maxY - 12,
              text: label,
              fontSize: 16,
              fill: '#000',
              opacity: 0.85,
            },
          });
  
          // label currency
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: price.getBBox().maxX + 5,
              y: rectBBox.maxY - 12,
              text: currency,
              fontSize: 12,
              fill: '#000',
              opacity: 0.75,
            },
          });
  
          // percentage
          const percentText = group.addShape('text', {
            attrs: {
              ...textConfig,
              x: rectBBox.maxX - 8,
              y: rectBBox.maxY - 12,
              text: `${((variableValue || 0) * 100).toFixed(2)}%`,
              fontSize: 12,
              textAlign: 'right',
              fill: colors[status],
            },
          });
  
          // percentage triangle
          const symbol = variableUp ? 'triangle' : 'triangle-down';
          const triangle = group.addShape('marker', {
            attrs: {
              ...textConfig,
              x: percentText.getBBox().minX - 10,
              y: rectBBox.maxY - 12 - 6,
              symbol,
              r: 6,
              fill: colors[status],
            },
          });
  
          // variable name
          group.addShape('text', {
            attrs: {
              ...textConfig,
              x: triangle.getBBox().minX - 4,
              y: rectBBox.maxY - 12,
              text: variableName,
              fontSize: 12,
              textAlign: 'right',
              fill: '#000',
              opacity: 0.45,
            },
          });
  
          // bottom line background
          const bottomBackRect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rectConfig.width,
              height: 4,
              radius: [0, 0, rectConfig.radius, rectConfig.radius],
              fill: '#E0DFE3',
            },
          });
  
          // bottom percent
          const bottomRect = group.addShape('rect', {
            attrs: {
              x: nodeOrigin.x,
              y: rectBBox.maxY - 4,
              width: rate * rectBBox.width,
              height: 4,
              radius: [0, 0, 0, rectConfig.radius],
              fill: colors[status],
            },
          });
  
          // collapse rect
          if (cfg.children && cfg.children.length) {
            group.addShape('rect', {
              attrs: {
                x: rectConfig.width / 2 - 8,
                y: -8,
                width: 16,
                height: 16,
                stroke: 'rgba(0, 0, 0, 0.25)',
                cursor: 'pointer',
                fill: '#fff',
              },
              name: 'collapse-back',
              modelId: cfg.id,
            });
  
            // collpase text
            group.addShape('text', {
              attrs: {
                x: rectConfig.width / 2,
                y: -1,
                textAlign: 'center',
                textBaseline: 'middle',
                text: collapsed ? '+' : '-',
                fontSize: 16,
                cursor: 'pointer',
                fill: 'rgba(0, 0, 0, 0.25)',
              },
              name: 'collapse-text',
              modelId: cfg.id,
            });
          }
  
          this.drawLinkPoints(cfg, group);
          return rect;
        },
        update(cfg, item) {
          const group = item.getContainer();
          this.updateLinkPoints(cfg, group);
        },
        setState(name, value, item) {
          if (name === 'collapse') {
            const group = item.getContainer();
            const collapseText = group.find((e) => e.get('name') === 'collapse-text');
            if (collapseText) {
              if (!value) {
                collapseText.attr({
                  text: '-',
                });
              } else {
                collapseText.attr({
                  text: '+',
                });
              }
            }
          }
        },
        getAnchorPoints() {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      },
      'rect',
    );
  
    G6.registerEdge(
      'flow-cubic',
      {
        getControlPoints(cfg) {
          let controlPoints = cfg.controlPoints; // 指定controlPoints
          if (!controlPoints || !controlPoints.length) {
            const { startPoint, endPoint, sourceNode, targetNode } = cfg;
            const { x: startX, y: startY, coefficientX, coefficientY } = sourceNode
              ? sourceNode.getModel()
              : startPoint;
            const { x: endX, y: endY } = targetNode ? targetNode.getModel() : endPoint;
            let curveStart = (endX - startX) * coefficientX;
            let curveEnd = (endY - startY) * coefficientY;
            curveStart = curveStart > 40 ? 40 : curveStart;
            curveEnd = curveEnd < -30 ? curveEnd : -30;
            controlPoints = [
              { x: startPoint.x + curveStart, y: startPoint.y },
              { x: endPoint.x + curveEnd, y: endPoint.y },
            ];
          }
          return controlPoints;
        },
        getPath(points) {
          const path = [];
          path.push(['M', points[0].x, points[0].y]);
          path.push([
            'C',
            points[1].x,
            points[1].y,
            points[2].x,
            points[2].y,
            points[3].x,
            points[3].y,
          ]);
          return path;
        },
      },
      'single-line',
    );
  };

  bindEvents = () => {
    const _this = this;
    // 监听edge上面mouse事件
    _this.graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      const type = target.get('type')
      if(type !== 'text') {
        return
      }
    })

    _this.graph.on('edge:mouseleave', () => {
      
    })

    // 监听node上面mouse事件
    _this.graph.on('node:mouseenter', evt => {
      const { item } = evt;
      const model = item.getModel();

      _this.setState({
        showNodeTooltip: true,
        currentNodeInfo: model,
      });
    })
  
    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    _this.graph.on('node:mouseleave', () => {
      _this.setState({
        showNodeTooltip: false,
        showNodeMenu: false,
      });
    })

    // 监听节点上面右键菜单事件
    _this.graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = _this.graph.getCanvasByPoint(x, y)
      _this.setState({
        showNodeMenu: true,
        nodeMenuX: point.x,
        nodeMenuY: point.y + 120,
        currentNodeInfo: model,
      });
    })

    // 监听画布右键菜单事件
    _this.graph.on('canvas:contextmenu', evt => {
      const { x, y } = evt
      const point = _this.graph.getCanvasByPoint(x, y);
      _this.setState({
        showCanvasMenu: true,
        canvasMenuX: point.x,
        canvasMenuY: point.y + 120,
      });
    })

    _this.graph.on('canvas:click', () => {
      _this.setState({
        showCanvasMenu: false,
        showNodeMenu: false,
        showNodeTooltip: false,
        showEdgeTooltip: false,
      });
    })
  }

  renderGraph = () => {
    const { data } = prop;
    if (!data) {
      return;
    }
    const container = document.getElementById('container');
     // 取消默认事件
     container.oncontextmenu = (e) => {
         e.preventDefault()
     }
    const width = container.scrollWidth;
    const height = container.scrollHeight || 800;
    const { config } = prop;
    const tooltip = new G6.Tooltip({
      offsetX: 0,
      offsetY: 150,
      // 允许出现 tooltip 的 item 类型
      itemTypes: ['node'],
      // 自定义 tooltip 内容
      getContent: (e) => {
        const { item } = e;
        const div = document.createElement('div');
        div.style.padding = '5px';
        const nodeName = item.getModel().name;
        div.innerHTML = `${nodeName}`;
        return div;
      },
      shouldBegin: (e) => {
        if (e.target.get('name') === 'name-shape') return true;
        return false;
      },
    });
    this.graph = new G6.TreeGraph({
      container: 'container',
      ...defaultConfig,
      ...config,
      plugins: [tooltip],
      width,
      height,
    });
    this.graph.data(data);
    this.graph.render();
    this.graph.zoom(config.defaultZoom || 1);
  
    const handleCollapse = (e) => {
      const target = e.target;
      const id = target.get('modelId');
      const item = this.graph.findById(id);
      const nodeModel = item.getModel();
      nodeModel.collapsed = !nodeModel.collapsed;
      this.graph.layout();
      this.graph.setItemState(item, 'collapse', nodeModel.collapsed);
    };
    this.graph.on('collapse-text:click', (e) => {
      handleCollapse(e);
    });
    this.graph.on('collapse-back:click', (e) => {
      handleCollapse(e);
    });
    this.bindEvents();
  };

  addNode = (nodeConfig = defaultNodeConfig) => {
    this.graph.addItem('node', {
      ...nodeConfig,
      id: uuidv4(),
    });
  }

  delNode = () => {
    const { currentNodeInfo } = this.state;
    const { id } = currentNodeInfo;
    console.log('id==>>>>>', id);
    this.graph.removeItem(id);
    this.setState({ showNodeMenu: false });
  }

  showNodeDetail = () => {
    this.setState({ nodeDetailVisible: true });
  }

  save = () => {
    const allDatas = this.graph.save();
    console.log('查看数据===>>>>>>>>>>', allDatas);
  }

  canvasMenuChange = (nodeConfig) => {
    this.addNode(nodeConfig);
    this.setState({ showCanvasMenu: false });
  }

  render() {
    const {
      showNodeTooltip,
      showNodeMenu,
      showCanvasMenu,
      nodeMenuX,
      nodeMenuY,
      canvasMenuX,
      canvasMenuY,
      nodeDetailVisible,
      currentNodeInfo,
    } = this.state;
    return (
      <Fragment>
        <Row justify='center' style={{ marginBottom: 20 }}>
            <Col>
              <Space size={10}>
                  <Button type="primary" onClick={() => { this.addNode(defaultNodeConfig); }}>添加节点</Button>
                  <Button onClick={this.save}>查看数据</Button>
                  <Button type="dashed">Dashed</Button>
                  <Button type="link">Link</Button>
              </Space>
            </Col>
        </Row>
        <div id='container' />
        { showNodeTooltip && <NodeTooltips nodeInfo={currentNodeInfo} /> }
        { showNodeMenu && <NodeMenu x={nodeMenuX} y={nodeMenuY} delNode={this.delNode} showNodeDetail= {this.showNodeDetail} /> }
        { showCanvasMenu && <CanvasMenu x={canvasMenuX} y={canvasMenuY} onChange={this.canvasMenuChange} /> }
        { nodeDetailVisible && <CanvasMenu x={canvasMenuX} y={canvasMenuY} onChange={this.canvasMenuChange} /> }
      </Fragment>
    );
  }
}

export default RegisterProcess;
