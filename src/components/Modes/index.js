import React, { Component } from 'react';
import G6 from '@antv/g6';
import { Select, Button, Space, Layout } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { data, selectData } from './data';
// import { moveFuc } from '../util';
import NodeContextMenu from './contextMenu';
import './style.css';

const Option = Select.Option;
const { Header, Footer, Sider, Content } = Layout;
const innerWidth = window.innerWidth || (document.body && document.body.clientWidth);
const innerHeight = window.innerHeight || (document.body && document.body.clientHeight);
export default class Modes extends Component {
    constructor(props){
        super(props);
        this.state = {
            showNodeContextMenu: false,
            x: 0,
            y: 0,
        };
    }

    componentDidMount() {
        // 自定义行为
        this.registerBehavior();
        // 自定义节点
        this.registerNode();
        // 自定义边
        this.registerEdge();
        // 初始化并渲染画布
        this.display();
    }

    modeChange = (value) => {
      console.log('value==>>', value);
      this.graph.setMode(value);
    }

    registerEdge = () => {
        
    }

    registerNode = () => {
        G6.registerNode(
            'rect_custom',
            {
              options: {
                style: {
                    radius: 15,
                    fill: 'lightblue',
                    stroke: '#888',
                    lineWidth: 1,
                    cursor: 'pointer',
                    width: 70,
                    height: 30
                },
                labelCfg: {
                    style: {
                        fill: '#000', // 字体颜色
                        lineWidth: 1, //
                        fontSize: 12,
                        cursor: 'pointer'
                    }
                },
                stateStyles: {
                  hover: {},
                  selected: {},
                },
              },
              /**
               * 绘制节点，包含文本
               * @param  {Object} cfg 节点的配置项
               * @param  {G.Group} group 图形分组，节点中图形对象的容器
               * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
               * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
               */
              draw(cfg, group) {},
              /**
               * 绘制后的附加操作，默认没有任何操作
               * @param  {Object} cfg 节点的配置项
               * @param  {G.Group} group 图形分组，节点中图形对象的容器
               */
              afterDraw(cfg, group) {},
              /**
               * 更新节点，包含文本
               * @override
               * @param  {Object} cfg 节点的配置项
               * @param  {Node} node 节点
               */
              update(cfg, node) {},
              /**
               * 更新节点后的操作，一般同 afterDraw 配合使用
               * @override
               * @param  {Object} cfg 节点的配置项
               * @param  {Node} node 节点
               */
              afterUpdate(cfg, node) {},
              /**
               * 响应节点的状态变化。
               * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
               * @param  {String} name 状态名称
               * @param  {Object} value 状态值
               * @param  {Node} node 节点
               */
              setState(name, value, node) {},
              /**
               * 获取锚点（相关边的连入点）
               * @param  {Object} cfg 节点的配置项
               * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
               */
              getAnchorPoints(cfg) {
                return [
                    [0, 0.5], // 左侧中间
                    [1, 0.5], // 右侧中间
                ];
              },
            },
            // 继承内置节点类型的名字，例如基类 'single-node'，或 'circle', 'rect' 等
            // 当不指定该参数则代表不继承任何内置节点类型
            'rect',
        );
    }

    registerBehavior = () => {
        // 封装点击添加节点的交互
        G6.registerBehavior('click-add-node', {
            // 设定该自定义行为需要监听的事件及其响应函数
            getEvents() {
            // 监听的事件为 canvas:click，响应函数是 onClick
                return {
                    'canvas:click': 'onClick',
                };
            },
            // 点击事件
            onClick(ev) {
                console.log('ev==>>', ev);
                const graph = this.graph;
                // 在图上新增一个节点
                graph.addItem('node', {
                    x: ev.canvasX,
                    y: ev.canvasY,
                    id: uuidv4(), // 生成唯一的 id
                    label: 'rect_custom',
                    type: 'rect_custom',
                    // style: {
                    //     // 仅在 keyShape 上生效
                    //     fill: 'lightblue',
                    //     stroke: '#888',
                    //     lineWidth: 1,
                    //     radius: 7,
                    // },
                    // linkPoints: {
                    //     top: true,
                    //     bottom: true,
                    //     left: true,
                    //     right: true,
                    //     // ... 四个圆的样式可以在这里指定
                    // },
                });
            },
        });
        
        // 封装点击添加边的交互
        G6.registerBehavior('click-add-edge', {
            // 设定该自定义行为需要监听的事件及其响应函数
            getEvents() {
            return {
                'node:click': 'onClick', // 监听事件 node:click，响应函数是 onClick
                mousemove: 'onMousemove', // 监听事件 mousemove，响应函数是 onMousemove
                'edge:click': 'onEdgeClick', // 监听事件 edge:click，响应函数是 onEdgeClick
            };
            },
            // getEvents 中定义的 'node:click' 的响应函数
            onClick(ev) {
            const node = ev.item;
            const graph = this.graph;
            console.log('ev==>>', ev);
            // 鼠标当前点击的节点的位置
            const point = { x: ev.x, y: ev.y };
            const model = node.getModel();
            console.log('model==>>', model);
            console.log(' this.edge==>>', this.edge);
            console.log(' this.addingEdge==>>', this.addingEdge);
            if (this.addingEdge && this.edge) {
                console.log('111111');
                graph.updateItem(this.edge, {
                    target: model.id,
                });
        
                this.edge = null;
                this.addingEdge = false;
            } else {
                console.log('22222');
                // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
                this.edge = graph.addItem('edge', {
                    source: model.id,
                    target: point,
                });
                this.addingEdge = true;
            }
            },
            // getEvents 中定义的 mousemove 的响应函数
            onMousemove(ev) {
                // 鼠标的当前位置
                const point = { x: ev.x, y: ev.y };
                if (this.addingEdge && this.edge) {
                    // console.log('333333');
                    // 更新边的结束点位置为当前鼠标位置
                    this.graph.updateItem(this.edge, {
                        target: point,
                    });
                }
            },
            // getEvents 中定义的 'edge:click' 的响应函数
            onEdgeClick(ev) {
                const currentEdge = ev.item;
                console.log('currentEdge==>>', currentEdge, this.edge === currentEdge);
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge === currentEdge) {
                    this.graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            },
        });
    }

    display = () => {
        let objDemo = document.getElementsByClassName('content')[0]
        objDemo.oncontextmenu = (e) => {
            e.preventDefault()
        }
        const graph = new G6.Graph({
            container: 'mountNode',
            width: innerWidth - 240,
            height: innerHeight,
            modes: {
                // 默认交互模式
                default: ['drag-node', 'click-select'],
                // 增加节点交互模式
                addNode: ['click-add-node', 'click-select'],
                // 增加边交互模式
                addEdge: ['click-add-edge', 'click-select'],
              },
              // 节点在不同状态下的样式集合
              nodeStateStyles: {
                // 节点在 selected 状态下的样式，对应内置的 click-select 行为
                selected: {
                  stroke: '#666',
                  lineWidth: 2,
                  fill: 'steelblue'
                },
                hover: {
                    fillOpacity: 0.1,
                    lineWidth: 3,
                },
            }
        });
        this.graph = graph;
        // this.graph.read(initData); // 读取并渲染数据 this.graph.read()
        this.graph.data(data); // 读取数据 this.graph.read()
        this.graph.render(); // 渲染画布
        // 监听鼠标进入节点事件
        this.graph.on('node:mouseenter', (evt) => {
            const node = evt.item;
            // 激活该节点的 hover 状态
            this.graph.setItemState(node, 'hover', true);
        });
        // 监听鼠标离开节点事件
        this.graph.on('node:mouseleave', (evt) => {
            const node = evt.item;
            // 关闭该节点的 hover 状态
            this.graph.setItemState(node, 'hover', false);
        });
        // 监听节点上面右键菜单事件
        this.graph.on('node:contextmenu', evt => {
            const { item } = evt
            const model = item.getModel()
            const { x, y } = model
            const point = graph.getCanvasByPoint(x, y)
            this.setState({
                showNodeContextMenu: true,
                x: point.x,
                y: point.y,
            })
        })
    }
   
    render () {
        const { showNodeContextMenu, x, y } = this.state;
        return (
            <div className='body'>
                <Layout>
                    <Header className={'header'}>
                        <Space align={'start'}>
                            <Select defaultValue={'default'} onChange={this.modeChange} style={{ width: '100px' }}>
                            {
                                selectData.map(item => <Option value={item.id}>{item.label}</Option>)
                            }
                            </Select>
                            <Button onClick={() => { console.log('graph.save() ==>>', this.graph.save());}}>获取数据</Button>
                        </Space>
                    </Header>
                    <Layout>
                        <Sider
                            collapsible={false}
                            className={'sider'}
                        >
                        </Sider>
                        <Content className={'content'}>
                            <div className='graphContent'>
                                <div id="mountNode" />
                            </div>
                        </Content>
                    </Layout>
                </Layout>
                { showNodeContextMenu && <NodeContextMenu x={x} y={y} /> }
            </div>
        )
    }
}