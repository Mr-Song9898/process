import React, { Component } from 'react';
import G6 from '@antv/g6';
// import { Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { SOURCE_NODE_DATA, DATA } from './data';
// import { moveFuc } from '../util';
import './style.css';

console.log('SOURCE_NODE_DATA==>', SOURCE_NODE_DATA, DATA, uuidv4());
// const Option = Select.Option;
const innerWidth = window.innerWidth || (document.body && document.body.clientWidth);
const innerHeight = window.innerHeight || (document.body && document.body.clientHeight);
export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            initData: {
                nodes: [
                    {
                        id:'1',
                        x: 300,
                        y: 200,
                        label: '起始点',
                        class: 'node1',
                        shape: 'rect',
                        style: {
                            // 仅在 keyShape 上生效
                            fill: 'lightblue',
                            stroke: '#888',
                            lineWidth: 1,
                            radius: 7,
                          },
                        linkPoints: {
                            top: true,
                            bottom: true,
                            left: true,
                            right: true,
                        }
                    },
                    {
                        id:'2',
                        x: 500,
                        y: 200,
                        label: '终点',
                        class: 'node2',
                        style: {
                            // 仅在 keyShape 上生效
                            fill: 'lightblue',
                            stroke: '#888',
                            lineWidth: 1,
                            radius: 7,
                          },
                        linkPoints: {
                            top: true,
                            bottom: true,
                            left: true,
                            right: true,
                        }
                    },
                ],
                edges: [
                    {
                        source: '1',
                        target: '2',
                        label: '连线'
                    }
                ]
            }
        };
    }

    componentDidMount() {
        // 初始化自定义交互行为
        // this.registerBehavior();
        // 初始化并渲染画布
        this.displayInitData();
        this.display();
        // 画布平移初始化
        // this.initMoveCanvas();
    }

    displayInitData = () => {
        // SOURCE_NODE_DATA.forEach((item) => {
        //     this.moveFuc(document, item.id);
        // })
    }


    display = () => {
        const { initData } = this.state;
        const graph2 = new G6.Graph({
            container: 'content',
            width: innerWidth - 240,
            height: innerHeight,
            // modes: {
            //     default: [ 'drag-node' ]
            // },
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
            // defaultNode: {
            //     type: 'rect'
            // },
            // nodeStateStyles: {
            //     // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
            //     hover: {
            //       fillOpacity: 0.1,
            //       lineWidth: 3,
            //     },
            //   },
            // },
        });
        this.graph2 = graph2;
        // this.graph2.read(initData); // 读取并渲染数据 this.graph.read()
        this.graph2.data(initData); // 读取数据 this.graph.read()
        this.graph2.render(); // 渲染画布
        // 监听鼠标进入节点事件
        this.graph2.on('node:mouseenter', (evt) => {
            const node = evt.item;
            // 激活该节点的 hover 状态
            this.graph2.setItemState(node, 'hover', true);
        });
        // 监听鼠标离开节点事件
        this.graph2.on('node:mouseleave', (evt) => {
            const node = evt.item;
            // 关闭该节点的 hover 状态
            this.graph2.setItemState(node, 'hover', false);
        });
    }
   
    addNode = (option) => {
        console.log('option=>', option);
        const { initData } = this.state;
        const item = SOURCE_NODE_DATA.find(item => item.id === option.id);
        initData.nodes.push(item);
        this.setState({
            initData,
        });
        this.graph2.read(initData);
        this.graph2.render();
    }

    render () {
        return (
            <div className='body'>
                <div className='graphContent'>
                    <div id="defaultContent">
                        {
                            SOURCE_NODE_DATA.map((item, index) => 
                            <div
                                className={item.class}
                                id={item.id + index}
                                onClick={() => { this.addNode(item); }}
                            >
                                <span>{item.label}</span>
                            </div>)
                        }
                    </div>
                    <div id="content" />
                </div>
            </div>
        )
    }
}