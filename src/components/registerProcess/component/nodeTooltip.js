import React from 'react'
import { Descriptions } from 'antd'
import './index.css'

const NodeToolTips = ({ nodeInfo }) => {
  const {
    id,
    name,
    count,
    label,
    rate,
    status,
    currency,
    x,
    y,
  } = nodeInfo;
  return (
    <div className="nodeTooltips">
      <Descriptions title="节点信息">
        <Descriptions.Item label="节点名称">{name}</Descriptions.Item>
        <Descriptions.Item label="节点id">{id}</Descriptions.Item>
        <Descriptions.Item label="label">{label}</Descriptions.Item>
        <Descriptions.Item label="rate">{rate}</Descriptions.Item>
        <Descriptions.Item label="x">{x}</Descriptions.Item>
        <Descriptions.Item label="y">{y}</Descriptions.Item>
      </Descriptions>
      {/* <h3>节点信息</h3>
      <p><label>节点名称:</label><span>{name}</span></p>
      <p><label>节点id:</label><span>{id}</span></p>
      <p><label>label:</label><span>{label}</span></p>
      <p><label>rate:</label><span>{rate}</span></p>
      <p><label>坐标：</label><span>{x}，{y}</span></p> */}
    </div>
  )
}

export default NodeToolTips
