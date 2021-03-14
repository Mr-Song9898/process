import React from 'react'
import { Menu, Icon } from 'antd'
import { ApartmentOutlined } from '@ant-design/icons';
import 'antd/es/menu/style/css'
import { NodeModelMap } from '../config';
const { SubMenu } = Menu

const NodeContextMenu = ({ x = 100, y = 100, onChange }) => {
  return (
    <Menu style={{ width: 180, position: 'absolute', left: x, top: y, border: '1px #ccc solid', borderRadius: 5, boxShadow: '1px 1px 1px 1px #aaa' }} mode="vertical">
      <SubMenu
        key="sub1"
        title={
          <span>
            <ApartmentOutlined />
            <span>添加节点</span>
          </span>
        }
      >
        <Menu.Item key="1" icon={<ApartmentOutlined />} onClick={() => onChange(NodeModelMap.begin) }>添加开始节点</Menu.Item>
        <Menu.Item key="2" icon={<ApartmentOutlined />} onClick={() => onChange(NodeModelMap.process) }>添加决策节点</Menu.Item>
        <Menu.Item key="3" icon={<ApartmentOutlined />} onClick={() => onChange(NodeModelMap.condition) }>添加条件节点</Menu.Item>
        <Menu.Item key="4" icon={<ApartmentOutlined />} onClick={() => onChange(NodeModelMap.end) }>添加结束节点</Menu.Item>
      </SubMenu>
      {/* <Menu.Item key="1" icon={<ApartmentOutlined />} onClick={() => onChange() }>添加开始节点</Menu.Item>
      <Menu.Item key="2" icon={<ApartmentOutlined />} onClick={() => onChange() }>添加决策节点</Menu.Item>
      <Menu.Item key="3" icon={<ApartmentOutlined />} onClick={() => onChange() }>添加条件节点</Menu.Item>
      <Menu.Item key="4" icon={<ApartmentOutlined />} onClick={() => onChange() }>添加结束节点</Menu.Item> */}
      <Menu.Item key="12" icon={<ApartmentOutlined />}>其他。。。</Menu.Item>
    </Menu>
  );
}

export default NodeContextMenu