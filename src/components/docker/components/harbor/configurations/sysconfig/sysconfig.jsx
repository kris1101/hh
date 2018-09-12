import React from 'react'
import { connect   } from 'react-redux';
import { Radio, Button, message, Form, InputNumber} from 'antd';
import { getHarborConfigurations } from '../../../../../../containers/Paas/harbor/configurations.redux'
import { putAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'

const FormItem = Form.Item;

class  HarborSysconfigForm extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    submit_isloading : false 
  }
  handleSubmit = () => {
    let _that = this;
    let value = this.props.form.getFieldsValue()
    this.setState({submit_isloading: true})
    console.log(value)
    putAjax('/harbor/configurations/', generateformdata({config_data: JSON.stringify(value)}), function(res){
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
          <FormItem label="令牌过期时间(分)"  labelCol= {{ span: 3  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('token_expiration', {rules:[{required: true}],
              initialValue: this.props.token_expiration}
            )(
                <InputNumber min={1}/>
            )}
          </FormItem>
          <FormItem label="仓库只读"  labelCol= {{ span: 3  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('read_only', {
              initialValue: this.props.read_only}
            )(
            <Radio.Group >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            )}
          </FormItem>
      <FormItem wrapperCol={{ span: 14 , offset:2  }}>
        <Button type="primary" disabled={this.props.read_only == this.props.form.getFieldsValue().read_only && this.props.token_expiration == this.props.form.getFieldsValue().token_expiration} loading={this.state.submit_isloading} onClick={this.handleSubmit}>更新</Button>
      </FormItem>
        </Form>
    );
  }
}

const HarborSysconfigManger = Form.create()(HarborSysconfigForm);
export default  connect(
  state => state.harborConfigurations,
  { getHarborConfigurations }
)(HarborSysconfigManger)

