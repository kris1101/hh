import React from 'react'
import { message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;
const projectnamePatten = new RegExp("^[0-9a-z][0-9a-z\._-]{1,}$"); 
const defaultMessage = "项目名称由小写字符、数字和._-组成且至少两个字符并以小写字符或者数字开头"

const ProjectCreateForm = Form.create()(
  class extends React.Component {
    checkprojectexists = (rule, value, callback) =>{
        if(!projectnamePatten.test(value)){
           callback(defaultMessage); 
        }else{
          getAjax('/harbor/checkproject/', {project_name: value}, function(res){
            if(res.data.code == 0){
                if(res.data.data){
                    callback("项目名称已经存在");
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
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建项目"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="项目名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('project_name', {
              rules: [{ required: true, validator: this.checkprojectexists}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="项目级别"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('public', {
                initialValue: 'true', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="true">公开</Radio>
                  <Radio value="false">私有</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { ProjectCreateForm }
