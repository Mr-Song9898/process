import React, { Component, Fragment } from 'react';
import { Select, Col, Row, Space, Button, Card } from 'antd';
import { DemoList } from './content';
import './style.css';
import { disPlayCurrentDome } from './util';

const { Option } = Select;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDome: 'registerProcess',
            title: 'this is the title',
        };
    }

    componentDidMount() {
    }

    onchange = (currentDome) => {
        const title = DemoList.find(item => item.id === currentDome).label;
        this.setState({
            currentDome,
            title,
        });
    }

    render () {
        const { currentDome, title } = this.state;
        return (
            <Fragment>
                <div className='body'>
                    <h2>{title}</h2>
                    <Row>
                        <Col>
                            <Space size={10}>
                                <Select
                                    placeholder="请选择模板"
                                    value={currentDome}
                                    style={{ width: 200}}
                                    onChange={this.onchange}
                                >
                                    {
                                        DemoList.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>)
                                    }
                                </Select>
                                <Button type="primary">Primary</Button>
                                <Button>Default</Button>
                                <Button type="dashed">Dashed</Button>
                                <Button type="link">Link</Button>
                            </Space>
                        </Col>
                    </Row>
                    <div>
                        {
                            disPlayCurrentDome(currentDome)
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}