import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;

const ClusterCreateForm = Form.create()(
  class extends React.Component {
       state = {
         fileList: []
       }
       checkprojectexists = (rule, value, callback) =>{
         if(!value){
                 callback("集群名称不能为空");
         }else{
             getAjax('/k8s/checkclustername/', {clustername: value}, function(res){
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
          title="新增集群"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="集群名称"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('clustername', {
              rules: [{ required: true, validator: this.checkprojectexists}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="所属地区"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('clusterzone', {
              rules: [{ required: true, message: "地区不能为空"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="dns类型"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('dns_type', {
                initialValue: 'coredns', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="coredns">coredns</Radio>
                  <Radio value="kubedns">kubedns</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="kubeconfig"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('kubeconfigfile', {
                  getValueFromEvent: this.normFile, rules: [{ required: true, message: "kubuconfig文件不能为空"}]
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

export { ClusterCreateForm }
