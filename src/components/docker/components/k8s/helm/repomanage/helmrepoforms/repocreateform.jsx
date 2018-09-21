import React from 'react'
import { message, Modal, Form, Input } from 'antd';
import { getAjax  } from '../../../../../utils/axios'

const FormItem = Form.Item;

const HelmRepoCreateForm = Form.create()(
  class extends React.Component {
    checkrepoexists = (rule, value, callback) =>{
        if(!value){
           callback("repo名称不能为空"); 
        }else{
          getAjax('/helm/checkrepoexist/', {name: value}, function(res){
            if(res.data.code == 0){
                if(res.data.data){
                    callback("Repo名称已经存在");
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
          title="新增repo"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="Repo名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('name', {
              rules: [{ required: true, validator: this.checkrepoexists}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="URL"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }} hasFeedback={true}>
              {getFieldDecorator('url', {
                rules: [{required: true, "message": "URL不能为空"},{type: "url", "message": "URL格式不对"}],
              })(
                <Input disabled={confirmLoading} placeholder="URL必须以http或者https开头"/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { HelmRepoCreateForm }
