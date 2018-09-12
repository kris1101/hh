import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getharborusers } from './TableTpl/tabletpl';
import { getHarborUserList } from '../../../../../containers/Paas/harbor/user.redux';
import { UserCreateForm } from './userforms/usercreateform'
import './user.less';
import { postAjax } from '../../../utils/axios'
import { generateformdata  } from '../../../utils/tools_helper'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class HarborUserForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getharborusers.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        UserCreateVisible: false,
        UserCreateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getHarborUserList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showUserCreateModel = () => {
        this.setState({UserCreateVisible: true}) 
    }

    handleUserCreateCancel = () => {
        this.setState({UserCreateVisible: false}) 
        this.setState({UserCreateConfirmLoading: false})
        const form = this.UserCreateFormRef.props.form;
        form.resetFields();
    }

    handleHarborUserListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.username = value.Username !== undefined ? value.Username : "";
       page_args.email = value.Email !== undefined ? value.Email : "";
       this.props.getHarborUserList(page_args);
    }

    handleUserCreate = () => {
      const form = this.UserCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({UserCreateConfirmLoading: true})
        const _that = this;
        postAjax('/harbor/user/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("创建成功") 
                _that.setState({UserCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ UserCreateVisible: false });
                _that.handleHarborUserListWithArgs(1, 10);
            }else{
                message.error(res.data.msg) 
                _that.setState({UserCreateConfirmLoading: false})
            }
        })
      });
    }

    saveUserCreateFormRef = (formRef) => {
      this.UserCreateFormRef = formRef;
    } 

    handleHarborUserQuery = () => {
      this.handleHarborUserListWithArgs(1, 10);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              _that.handleHarborUserListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleHarborUserListWithArgs(1, size);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="用户" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showUserCreateModel}>新建用户</Button>
        				<UserCreateForm
        				  wrappedComponentRef={this.saveUserCreateFormRef}
        				  visible={this.state.UserCreateVisible}
                          confirmLoading={this.state.UserCreateConfirmLoading}
        				  onCancel={this.handleUserCreateCancel}
        				  onCreate={this.handleUserCreate}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('Username')(
                                <Input placeholder="用户名称" />
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('Email')(
                                <Input placeholder="email" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleHarborUserQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.user_id} columns={this.columns} dataSource={this.props.userList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HarborUserManage = Form.create()(HarborUserForm);
export default connect(
  state => state.harborUser,
  { getHarborUserList })(HarborUserManage)
