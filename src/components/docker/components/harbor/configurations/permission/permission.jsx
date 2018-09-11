import React from 'react'
import { connect   } from 'react-redux';
import { Button, message, Form, Radio} from 'antd';
import { getHarborConfigurations } from '../../../../../../containers/Paas/harbor/configurations.redux'
import { putAjax } from '../../../../utils/axios'

const FormItem = Form.Item;

class  HarborPermissionForm extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    submit_isloading : false 
  }
  handleSubmit = () => {
    let _that = this;
    this.setState({submit_isloading: true})
    let value = this.props.form.getFieldsValue()
    console.log(value)
    putAjax('/harbor/configurations/', {config_data: JSON.stringify(value)}, function(res){
      _that.setState({submit_isloading: false})
      if(res.data.code == 0){                                                                                     
          message.success("更新成功");
          _that.props.getHarborConfigurations();
      }else{
          message.error("更新失败");                                                                              
          console.log(res.data.msg);                                                                              
      }   
     })   

  }
  
  render() {
    const { form, project_id } = this.props;
    const { getFieldDecorator } = form;
    return (
        <Form >
          <FormItem label="项目创建"  labelCol= {{ span: 2  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('project_creation_restriction', {
              initialValue: this.props.project_creation_restriction}
            )(
            <Radio.Group >
                <Radio value="everyone">所有人</Radio>
                <Radio value="adminonly">仅管理员</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="允许注册"  labelCol= {{ span: 2  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('self_registration', {
              initialValue: this.props.self_registration}
            )(
            <Radio.Group >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
      <FormItem wrapperCol={{ span: 14 , offset:2  }}>
        <Button type="primary" disabled={this.props.self_registration == this.props.form.getFieldsValue().self_registration && this.props.project_creation_restriction == this.props.form.getFieldsValue().project_creation_restriction} loading={this.state.submit_isloading} onClick={this.handleSubmit}>更新</Button>
      </FormItem>
        </Form>
    );
  }
}

const HarborPermissionManger = Form.create()(HarborPermissionForm);
export default  connect(
  state => state.harborConfigurations,
  { getHarborConfigurations }
)(HarborPermissionManger)

