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
          fileList:[],
          is_ssl: false
        }
      )
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
          title="新增Tiller配置"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="加密访问"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }}>
              {getFieldDecorator('is_ssl')(
                <Switch disabled={confirmLoading} onChange={this.handleswitchchange} />
              )}
            </FormItem>
            
            {this.state.is_ssl ? (<FormItem label="kubeconfig"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('kubeconfigfile', {
                  getValueFromEvent: this.normFile, rules: [{ required: true, message: "kubuconfig文件不能为空"}]
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

export { TillerCreateForm }
