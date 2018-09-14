import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Switch, Radio } from 'antd';

const FormItem = Form.Item;

const TillerUpdateForm = Form.create()(
  class extends React.Component {
       state = {
         fileList: [],
         is_ssl: false
       }
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e.slice(-1);
      }
      return e.file;
    }
    
    handleChange = (checked) => {
        this.setState({is_ssl: checked})
        console.log(`switch to ${checked}`); 
    }
    reset = () => {
      this.setState(
        {   
          fileList:[],
          is_ssl: false
        }   
      )   
    }   


    render() {
      const { confirmLoading, visible, onCancel, onCreate, tillerinfo, form } = this.props;
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
          title="编辑Tiiler配置"
          okText="更新"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="加密访问"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }}>
              {getFieldDecorator('is_ssl', { initialValue: tillerinfo.is_ssl })(
                  <Switch defaultChecked onChange={this.handleChange} />
              )}
            </FormItem>
            {this.state.is_ssl ? (<FormItem label="kubeconfig"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('kubeconfigfile', {
                  getValueFromEvent: this.normFile
              })(
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </FormItem>) : null}
          </Form>
        </Modal>
      );
    }
  }
);

export { TillerUpdateForm }
