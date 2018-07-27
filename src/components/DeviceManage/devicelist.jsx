import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import './devicelist.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DeviceManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        deviceList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.setState({
            deviceList:[{
                key:'1',
                deviceId: '1000',
                deviceName: '停车场一'
            }, {
                key:'2',
                deviceId: '2001',
                deviceName: '东门一'
            }]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    openAddDevicePage = (value) => {
        this.props.history.push({pathname:'/config/add-device', data:value});
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
                  _that.getDeviceList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="设备管理" second="设备列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>添加设备</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('area',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按配置区域</Option>
                                <Option value="1">区域一</Option>
                            </Select>
                        )}
                    </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('purpose',{initialValue:''})(
                                <Select style={{ width:120 }}>
                                    <Option value="">按设备用途</Option>
                                    <Option value="1">人脸识别</Option>
                                    <Option value="2">周界入侵</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('status',{initialValue:''})(
                                <Select style={{ width:120 }}>
                                    <Option value="">按设备状态</Option>
                                    <Option value="1">在线</Option>
                                    <Option value="2">离线</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('value')(
                                <Input placeholder="请输入IP地址、设备编号" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" htmlType="submit" style={{marginRight: 10}}>搜索</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.key} columns={this.columns} dataSource={this.state.deviceList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DeviceManage = Form.create()(DeviceManageForm);
export default connect((state) => {
    return { ...state };
})(DeviceManage);
