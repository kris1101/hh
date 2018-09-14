import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Switch, Radio } from 'antd';

const FormItem = Form.Item;

const TillerCreateForm = Form.create()(
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

    handleswitchchange = (checked) => {
        this.setState({is_ssl: checked})
        console.log(checked);
    }

    reset = () => {
      this.setState(
        {
          cafileList:[],
          keyfileList:[],
          certfileList:[],
          is_ssl: false
        }
      )
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const _that = this;
      const caprops = {
        withCredentials: true,
        onRemove: (file) => {
          return false;
        },
        disabled:confirmLoading,
        showUploadList: {
          showRemoveIcon: false
        },
        fileList: _that.state.cafileList,
        onChange: (info) => {
            let fileList = info.fileList;
            fileList = fileList.slice(-1);
            _that.setState({cafileList: fileList})
        },
        beforeUpload: (file) => {
          this.setState(({ cafileList }) => ({
            cafileList: [file],
          }));
          return false;
        },
        cafileList: this.state.cafileList,
      };
      const keyprops = {
        withCredentials: true,
        onRemove: (file) => {
          return false;
        },
        disabled:confirmLoading,
        showUploadList: {
          showRemoveIcon: false
        },
        fileList: _that.state.keyfileList,
        onChange: (info) => {
            let fileList = info.fileList;
            fileList = fileList.slice(-1);
            _that.setState({keyfileList: fileList})
        },
        beforeUpload: (file) => {
          this.setState(({ keyfileList }) => ({
            keyfileList: [file],
          }));
          return false;
        },
        keyfileList: this.state.keyfileList,
      };
      const certprops = {
        withCredentials: true,
        onRemove: (file) => {
          return false;
        },
        disabled:confirmLoading,
        showUploadList: {
          showRemoveIcon: false
        },
        fileList: _that.state.certfileList,
        onChange: (info) => {
            let fileList = info.fileList;
            fileList = fileList.slice(-1);
            _that.setState({certfileList: fileList})
        },
        beforeUpload: (file) => {
          this.setState(({ certfileList }) => ({
            certfileList: [file],
          }));
          return false;
        },
        certfileList: this.state.certfileList,
      };
      return (
        <Modal
          visible={visible}
          title="新增Tiller配置"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="加密访问"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }}>
              {getFieldDecorator('is_ssl',{initialValue: false, rules:[{required: true}]})(
                <Switch disabled={confirmLoading} onChange={this.handleswitchchange} checked={this.state.is_ssl}/>
              )}
            </FormItem>
            
            {this.state.is_ssl ? (
              <div>
              <FormItem label="ca根证书"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('cafile', {
                  getValueFromEvent: this.normFile, rules: [{ required: true, message: "cafile文件不能为空"}]
              })(
                <Upload {...caprops}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
              </FormItem>
              <FormItem label="客户密钥"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('keyfile', {
                  getValueFromEvent: this.normFile, rules: [{ required: true, message: "keyfile文件不能为空"}]
              })(
                <Upload {...keyprops}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
              </FormItem>
              <FormItem label="客户证书"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('certfile', {
                  getValueFromEvent: this.normFile, rules: [{ required: true, message: "certfile文件不能为空"}]
              })(
                <Upload {...certprops}>
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
              </FormItem>
            </div>
            ) : null}
          </Form>
        </Modal>
      );
    }
  }
);

export { TillerCreateForm }
