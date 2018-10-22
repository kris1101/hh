import React from 'react'
import { connect   } from 'react-redux';
import { Button, message, Form, Radio} from 'antd';
import {getProjectMetadata} from '../../../../../../../containers/Paas/harbor/projectdetails.redux'
import { putAjax } from '../../../../../utils/axios'
import { generateformdata } from '../../../../../utils/tools_helper'

const FormItem = Form.Item;

class  ProjectConfigForm extends React.Component {

  state = {
    submit_isloading : false 
  }
  handleSubmit = () => {
    let _that = this;
    this.setState({submit_isloading: true})
    let value = this.props.form.getFieldsValue()
    console.log(value)
    putAjax('/harbor/changepublic/', generateformdata({project_id: this.props.project_id, public: value.public}), function(res){
      _that.setState({submit_isloading: false})
      if(res.data.code === 0){                                                                                     
          _that.props.getProjectMetadata({project_id: _that.props.project_id});                                                                     
          message.success("更新成功");
      }else{
          message.error("更新失败");                                                                              
          console.log(res.data.msg);                                                                              
      }   
     })   

  }
  
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
        <Form >
          <FormItem label="项目仓库"  labelCol= {{ span: 2  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('public', {
              initialValue: this.props.project_ispublic}
            )(
            <Radio.Group >
                <Radio value="true">公开</Radio>
                <Radio value="false">私有</Radio>
              </Radio.Group>
            )}
          </FormItem>
      <FormItem wrapperCol={{ span: 14 , offset:2  }}>
        <Button type="primary" disabled={this.props.project_ispublic === this.props.form.getFieldsValue().public} loading={this.state.submit_isloading} onClick={this.handleSubmit}>更新</Button>
      </FormItem>
        </Form>
    );
  }
}

const ProjectConfigManger = Form.create()(ProjectConfigForm);
export default  connect(
  state => state.harborProjectDetails,
  {getProjectMetadata}
)(ProjectConfigManger)

