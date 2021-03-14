import React from 'react'
import { Menu, Icon } from 'antd'
import { InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/es/menu/style/css'

const NodeContextMenu = ({ x = 100, y = 100, delNode, showNodeDetail }) => {
  return <Menu className="process-menu" style={{ width: 180, position: 'absolute', left: x, top: y, border: '1px #ccc solid', borderRadius: 5, boxShadow: '1px 1px 1px 1px #aaa' }} mode="vertical">
    <Menu.Item key="1" icon={<DeleteOutlined />} onClick={delNode}>删除节点</Menu.Item>
    {/* <Menu.Item key="2" icon={<InfoCircleOutlined />} onClick={showNodeDetail}>查看详情</Menu.Item> */}
  </Menu>
}

export default NodeContextMenu