import React, { Component } from 'react';
import { message, Form, Input, Button, Table, Row, Col } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../../BreadcrumbCustom';
import { getprojectmembers } from './TableTpl/tabletpl';
import './members.less';
import { getProjectMemberList, getValidMemberData } from '../../../../../../../containers/Paas/harbor/projectdetails.redux';
import { MemberCreateForm } from './membersforms/membercreateform'
import {postAjax} from '../../../../../utils/axios'
import { generateformdata } from '../../../../../utils/tools_helper'

const FormItem = Form.Item;

class HarborMembersForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getprojectmembers.call(this);
        this.project_id = this.props.project_id;
    }
    state = {
		memberCreateVisible: false,
        memberCreateConfirmLoading: false,
        	
    }

    showMemberCreateModel = () => {
        this.props.getValidMemberData({project_id: this.project_id})
        this.setState({memberCreateVisible: true}) 
    }   

    handleMemberCreateCancel = () => {
        this.setState({memberCreateVisible: false}) 
        this.setState({memberCreateConfirmLoading: false})
        const form = this.memberCreateFormRef.props.form;
        form.resetFields();
    }   

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleProjectMemberListWithArgs = () => {
       let value = this.props.form.getFieldsValue()
       let args={};
       args.entityname = value.entityname !== undefined ? value.entityname : "";
       args.project_id = this.project_id;
       this.props.getProjectMemberList(args);
    }

    saveMemberCreateFormRef = (formRef) => {
      this.memberCreateFormRef = formRef;
    }

    handleMemberCreate = () => {
      const form = this.memberCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }   
        this.setState({memberCreateConfirmLoading: true})
        values.project_id = this.project_id;
        const _that = this;
        postAjax('/harbor/projectmember/', generateformdata(values), function(res){
            if(res.data.code == 0){ 
                message.success("添加成功") 
                _that.setState({memberCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ memberCreateVisible: false }); 
                _that.handleProjectMemberQuery();
            }else{
                message.error(res.data.msg)
                _that.setState({memberCreateConfirmLoading: false})
            }
        })
      });
    }

    handleProjectMemberQuery = () => {
      this.handleProjectMemberListWithArgs();
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
            <div style={{ background:'#fff',height: 55}}>
                <Form layout="inline">
                    <FormItem label="">
                         <Button type="primary" onClick={this.showMemberCreateModel}>新增成员</Button>
                        <MemberCreateForm
                          wrappedComponentRef={this.saveMemberCreateFormRef}
                          visible={this.state.memberCreateVisible}
                          confirmLoading={this.state.memberCreateConfirmLoading}
                          onCancel={this.handleMemberCreateCancel}
                          onCreate={this.handleMemberCreate}
                          validMemberData={this.props.validMemberData}
                        />
                    </FormItem>
                    <div style={{ float:'right'  }}>
                    <FormItem label="">
                        {getFieldDecorator('entityname')(
                            <Input placeholder="用户名称" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleProjectMemberQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                  </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.projectmember_loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.projectmemberList} />
            </div>
      </div>
    );
  }
}


const HarborMembersManage = Form.create()(HarborMembersForm);
export default connect(
  state => state.harborProjectDetails,
  { getProjectMemberList, getValidMemberData })(HarborMembersManage);
