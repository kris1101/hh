import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getprojects } from './TableTpl/tabletpl';
import './harborproject.less';
import { getProjectList } from '../../../../../containers/Paas/harbor/project.redux'
import { ProjectCreateForm } from './projectforms/projectcreateform'
import { postAjax } from '../../../utils/axios'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class HarborProjectForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getprojects.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        ProjectCreateVisible: false,
        ProjectDeleteVisible: false,
        ProjectCreateConfirmLoading: false,
        ProjectDeleteConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getProjectList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showProjectCreateModel = () => {
        this.setState({ProjectCreateVisible: true}) 
    }

    showProjectDeleteModel = () => {
        this.setState({ProjectDeleteVisible: true}) 
    }
    
    handleProjectCreateCancel = () => {
        this.setState({ProjectCreateVisible: false}) 
        this.setState({ProjectCreateConfirmLoading: false})
        const form = this.projectCreateFormRef.props.form;
        form.resetFields();
    }

    handleProjectDeleteCancel = () => {
        this.setState({ProjectDeleteVisible: false}) 
        this.setState({ProjectDeleteConfirmLoading: false})
        const form = this.projectCreateFormRef.props.form;
        form.resetFields();
    }

    handleProjectListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.name = value.name !== undefined ? value.name : "";
       page_args.public = value.public !== undefined ? value.public : "";
       page_args.owner = value.owner !== undefined ? value.owner : "";
       this.props.getProjectList(page_args);
    }

    handleProjectCreate = () => {
      const form = this.projectCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({ProjectCreateConfirmLoading: true})
        const _that = this;
        console.log(values);
        postAjax('/harbor/projects/', values, function(res){
            console.log(res);
            if(res.data.code == 0){
                message.success("创建成功") 
                _that.setState({ProjectCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ ProjectCreateVisible: false });
                _that.handleProjectListWithArgs(1, 10);
            }else{
                message.error(res.data.msg) 
                _that.setState({ProjectCreateConfirmLoading: false})
            }
        })
      });
    }

    handleProjectDelete = () => {
      const form = this.projectDeleteFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ ProjectDeleteVisible: false });
      });
    }

    saveProjectCreateFormRef = (formRef) => {
      this.projectCreateFormRef = formRef;
    } 

    saveProjectDeleteFormRef = (formRef) => {
      this.projectDeleteFormRef = formRef;
    } 

    handleProjectQuery = () => {
      this.handleProjectListWithArgs(1, 10);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              _that.handleProjectListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleProjectListWithArgs(1, size);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="项目" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showProjectCreateModel}>新建项目</Button>
        				<ProjectCreateForm
        				  wrappedComponentRef={this.saveProjectCreateFormRef}
        				  visible={this.state.ProjectCreateVisible}
                          confirmLoading={this.state.ProjectCreateConfirmLoading}
        				  onCancel={this.handleProjectCreateCancel}
        				  onCreate={this.handleProjectCreate}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="项目名称" />
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('public')(
                                <Select style={{ width: 150  }} showSearch placeholder="是否公开">
                                  <Option value={1}>公开</Option>
                                  <Option value={0}>私有</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('owner')(
                                <Input placeholder="用户名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleProjectQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.project_id} columns={this.columns} dataSource={this.props.projectList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HarborProjectManage = Form.create()(HarborProjectForm);
export default connect(
  state => state.harborProject,
  { getProjectList })(HarborProjectManage);
