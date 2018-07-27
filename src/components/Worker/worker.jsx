import React, { Component } from 'react';
import LeftSider from '../../components/common/LeftSider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { getColumns } from './TableTpl/tabletpl';
import WorkerModal from './Modal/modal';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class UserListForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getColumns.call(this);
    }
    state = {
        workerList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        isOpen: false,
    }
    componentDidMount () {
        this.setState({
            workerList:[{
                key:'1',
                workerTeam: '施工队一',
                memberNum: 15
            },{
                key:'2',
                workerTeam: '施工队二',
                memberNum: 10
            }]
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    openModal = (data) => {
        console.log(data)
        if(data === "add"){
            this.setState({
                modalType: 'add',
                isOpen: true,
                dataList: data
            })
        } else {
            this.setState({
                modalType: 'edit',
                isOpen: true,
                dataList: data
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
            <BreadcrumbCustom first="人员管理" second="施工人员" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openModal("add",e)}>创建队伍</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                    <FormItem label="">
                        {getFieldDecorator('partment',{initialValue:''})(
                            <Select style={{ width:120 }}>
                                <Option value="">按施工状态</Option>
                                <Option value="1">未开始</Option>
                                <Option value="2">施工中</Option>
                                <Option value="3">已结束</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="">
                        {getFieldDecorator('workerTeam',{})(
                            <Input placeholder="请输入施工队名称"/>
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
                <Table bordered rowKey={record => record.key} columns={this.columns} dataSource={this.state.workerList} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>

            {
                this.state.isOpen && <WorkerModal hideModal={this.hideModal} modalType={this.state.modalType} isOpen={this.state.isOpen} dataList={this.state.dataList} />
            }
        </Content>
      </Layout>
    );
  }
}

const Worker = Form.create()(UserListForm);
export default connect((state) => {
    return { ...state };
})(Worker);
