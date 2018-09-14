import React, { Component  } from 'react';
import { Select, Form } from 'antd';

const Option = Select.Option;


class K8sClusterSelectForm extends Component {

  constructor(props) {
     super(props)
  }
  render() {
    return (
        <Form layout="inline">	
            <FormItem label="集群选择"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} >
              {getFieldDecorator('clustername')( 
                   <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择集群"
                      optionFilterProp="children"
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>					
              )}  
            </FormItem>
        </Form>

    )
  }
}

const K8sClusterSelectManage = Form.create()(K8sClusterSelectForm);
export default K8sClusterSelectManage 
