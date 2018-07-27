import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import './arealist.less';

import AreaModal from './Modal/modal';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DeviceManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        areaList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        modalType: "",
        isOpen: false,
        areaData: "",
    }
    componentDidMount () {
        this.setState({
            areaList:[{
                key:'1',
                areaName:'车间一',
                planNum: 45,
                configNum: 45,
                configStatus: '完成',
                remarks: '123456789'
            }, {
                key:'2',
                areaName:'车间二',
                planNum: 45,
                configNum: 20,
                configStatus: '未完成',
                remarks: '123456789'
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
                  _that.getAreaList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <LeftSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="区域管理" second="区域列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal('add', e)}>添加区域</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('status',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按配置状态</Option>
                                <Option value="1">完成</Option>
                                <Option value="2">未完成</Option>
                            </Select>
                        )}
                    </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('value')(
                                <Input placeholder="请输入区域名称" />
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
                <Table bordered rowKey={record => record.key} columns={this.columns} dataSource={this.state.areaList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>
            {
                this.state.isOpen && <AreaModal hideModal={this.hideModal} modalType={this.state.modalType} isOpen={this.state.isOpen} areaData={this.state.areaData} />
            }
        </Content>
      </Layout>
    );
  }
}

const DeviceManage = Form.create()(DeviceManageForm);
export default connect((state) => {
    return { ...state };
})(DeviceManage);
