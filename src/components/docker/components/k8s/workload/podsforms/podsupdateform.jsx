import React from 'react'
import { Icon, Button, Upload,  Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;

const PodUpdateForm = Form.create()(
  class extends React.Component {
       state = {
         fileList: []
       }
       checkprojectexists = (rule, value, callback, initialValue) =>{
         if(!value){
                 callback("集群名称不能为空");

         }else if(value === initialValue){
                callback();
         }else{
             getAjax('/workload/pod/', {podname: value}, function(res){
               if(res.data.code === 0){
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
      }
      return e.file;
    }

    resetfilelist = () => {
        this.setState({fileList:[]})
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, podinfo, form } = this.props;
      console.log(podinfo);
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
        }
      };
      return (
        <Modal
          visible={visible}
          title="编辑集群"
          okText="更新"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="集群名称"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('Podname', { initialValue: podinfo.pod_name,
              rules: [{ required: true, validator: (rule, value, callback) => {this.checkprojectexists(rule, value, callback, podinfo.pod_name)}}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="所属地区"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('podzone', {initialValue: podinfo.pod_address,
              rules: [{ required: true, message: "地区不能为空"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="dns类型"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('dns_type', {
                initialValue: podinfo.dns_type, rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="coredns">coredns</Radio>
                  <Radio value="kubedns">kubedns</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="kubeconfig"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('kubeconfigfile', {
                  getValueFromEvent: this.normFile
              })(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { PodUpdateForm }
