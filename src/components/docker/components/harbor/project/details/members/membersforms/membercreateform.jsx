import React from 'react'
import { message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../../../utils/axios'

const FormItem = Form.Item;

const MemberCreateForm = Form.create()(
  class extends React.Component {
    checkvaildmember = (rule, value, callback, project_id) =>{ 
        if(!value){
           callback("成员名称不能为空"); 
        }else{
          getAjax('/harbor/projectvalidmember/', {username: value, project_id: project_id}, function(res){
            if(res.data.code == 0){ 
                if(res.data.data !== true){
                    callback(res.data.data);
                }else{
                    callback();
                }   
            }else{
                callback("未知错误,无法判断项目是否存在,请查看后端日志");
            }   
          })  
        }   
    }   

    render() {
      const { project_id, confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增成员"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="成员名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('username', {
              rules: [{ required: true, validator: (rule, value, callback) => this.checkvaildmember(rule, value, callback, project_id)}],
              })( 
                <Input disabled={confirmLoading} />
              )}  
            </FormItem>
            <FormItem label="角色权限"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('role_id', {
                initialValue: '1', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="1">项目管理员</Radio>
                  <Radio value="2">开发人员</Radio>
                  <Radio value="3">访客</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { MemberCreateForm }
