import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import EmployeesModal from './Modal/modal';
import EmployeesModal2 from './Modal/modal2';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class UserListForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        partmentList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isOpen: false,
        isOpen2: false
    }
    componentDidMount () {
        this.setState({
            partmentList:[{
                key:'1',
                groupNum: 1,
                partmentName: '加工组',
                groupName1: '加工一组'
            },{
                key:'2',
                groupNum: 1,
                partmentName: '车床组',
                groupName1: '车床一组'
            }]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }
    openModal = () => {
        this.setState({
            isOpen: true,
        })
    }
    hideModal = () => {
        this.setState({
            isOpen: false,
        })
    }

    openModal2 = (data, type) => {
        console.log(data,type)
        if(type === "edit"){
            this.setState({
                modalType: 'edit',
                isOpen2: true,
                dataList: data
            })
        } else {
            this.setState({
                modalType: 'view',
                isOpen2: true,
                dataList: data
            })
        }
    }
    hideModal2 = () => {
        this.setState({
            isOpen2: false,
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
            <BreadcrumbCustom first="人员管理" second="正式员工" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal(e)}>添加部门</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('partment',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按部门选择</Option>
                                <Option value="1">加工组</Option>
                                <Option value="2">车床组</Option>
                            </Select>
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
                <Table bordered rowKey={record => record.key} columns={this.columns} dataSource={this.state.partmentList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>

            {
                this.state.isOpen && <EmployeesModal hideModal={this.hideModal} isOpen={this.state.isOpen} />
            }
            {
                this.state.isOpen2 && <EmployeesModal2 hideModal={this.hideModal2} modalType={this.state.modalType} isOpen={this.state.isOpen2} dataList={this.state.dataList} />
            }
        </Content>
      </Layout>
    );
  }
}

const Employees = Form.create()(UserListForm);
export default connect((state) => {
    return { ...state };
})(Employees);
