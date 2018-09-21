import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;

const PodCreateForm = Form.create()(
  class extends React.Component {
       state = {
         fileList: []
       }
       checkprojectexists = (rule, value, callback) =>{
         if(!value){
                 callback("集群名称不能为空");
         }else{
             getAjax('/workload/pod', {podname: value}, function(res){
               if(res.data.code == 0){
                   if(res.data.data){
                       callback("集群名称已经存在");
                   }else{
                       callback();
                   }
               }else{
                   callback("未知错误,无法判断项目是否存在,请查看后端日志");
               }
             })

         }
       }
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e.slice(-1);
        console.log("array");
      }
      return e.file;
    }

    resetfilelist = () => {
        this.setState({fileList:[]})
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const _that = this;
      const props = {
        withCredentials: true,
        onRemove: (file) => {
          return false;
        },
        disabled:confirmLoading,
        showUploadList: {
          showRemoveIcon: false
        },
        fileList: _that.state.fileList,
        onChange: (info) => {
            let fileList = info.fileList;
            fileList = fileList.slice(-1);
            _that.setState({fileList})
        },
        beforeUpload: (file) => {
          this.setState(({ fileList }) => ({
            fileList: [file],
          }));
          return false;
        },
        fileList: this.state.fileList,
      };
      return (
        <Modal
          visible={visible}
          title="新增Pod"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="name"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('podname', {
              rules: [{ required: true, validator: this.checkprojectexists}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="namespace"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('podnamespace', {
              rules: [{ required: true, validator: this.checkprojectexists}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="labels"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('podlabels', {
              rules: [{ required: true, message: "标签以逗号分割"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="image"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('podzone', {
              rules: [{ required: true, message: "image不能为空"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>

          </Form>
        </Modal>
      );
    }
  }
);

export { PodCreateForm }
