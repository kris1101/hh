import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Checkbox, Card, Col, Row} from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import AlarmModal from './Modal/modal';
import './alarmset.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;

const data = [
    { address: '123456@163.com'},
    { address: '123456@163.com'},
    { address: '123456@163.com'}
]

class UserListForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        userList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.setState({
            userList:[{
                key:'1',
                id: '1000',
                roleName: '超级管理员'
            }, {
                key:'2',
                id: '2001',
                roleName: '设备添加员'
            }]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }
    openModal = (data) => {
        if(data === "add"){
            this.setState({
                modalType: data,
                isOpen: true,
                areaData: null
            })
        } else {
            this.setState({
                modalType: 'edit',
                isOpen: true,
                areaData: data
            })
        }
    }
    hideModal = () => {
        this.setState({
            isOpen: false,
        })
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.state.total,
          pageSize: this.state.pageSize,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: this.current,
              }, () => {
                  _that.getUserList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="系统设置" second="告警设置" />
            <div className="alarm-box">
                <Row>
                    <Col span={10}>
                        <Card title="高级别警报">
                            <Row>
                                <Col span={12}>
                                    <div className="checkbox">
                                        <Checkbox.Group onChange={this.onChange}>
                                            <Checkbox value="1">声音告警</Checkbox><br/>
                                            <Checkbox value="2">邮件告警</Checkbox><br/>
                                            <Checkbox value="3">弹窗告警</Checkbox>
                                        </Checkbox.Group>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="button">
                                        <Button type="primary">试听</Button><br/>
                                        <Button type="primary" onClick={(e) => this.openModal(e)}>邮件列表</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={10} offset={1}>
                        <Card title="中级别警报">
                            <Row>
                                <Col span={12}>
                                    <div className="checkbox">
                                        <Checkbox.Group onChange={this.onChange}>
                                            <Checkbox value="1">声音告警</Checkbox><br/>
                                            <Checkbox value="2">邮件告警</Checkbox><br/>
                                            <Checkbox value="3">弹窗告警</Checkbox>
                                        </Checkbox.Group>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="button">
                                        <Button type="primary">试听</Button><br/>
                                        <Button type="primary" onClick={(e) => this.openModal(e)}>邮件列表</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={10} style={{marginTop: 20}}>
                        <Card title="低级别警报">
                            <Row>
                                <Col span={12}>
                                    <div className="checkbox">
                                        <Checkbox.Group onChange={this.onChange}>
                                            <Checkbox value="1">声音告警</Checkbox><br/>
                                            <Checkbox value="2">邮件告警</Checkbox><br/>
                                            <Checkbox value="3">弹窗告警</Checkbox>
                                        </Checkbox.Group>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="button">
                                        <Button type="primary">试听</Button><br/>
                                        <Button type="primary" onClick={(e) => this.openModal(e)}>邮件列表</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
            {
                this.state.isOpen && <AlarmModal hideModal={this.hideModal} isOpen={this.state.isOpen} emailData={data}/>
            }
            <div className="" style={{marginTop:20, textAlign:"center"}}>
                <Button type="primary">保存</Button>
            </div>
        </Content>
      </Layout>
    );
  }
}

const Alarmset = Form.create()(UserListForm);
export default connect((state) => {
    return { ...state };
})(Alarmset);
