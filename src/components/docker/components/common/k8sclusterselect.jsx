import React, { Component  } from 'react';
import { Select, Form } from 'antd';
import { connect  } from 'react-redux'; 
import { getUserClusterList } from '../../../../containers/Paas/common/paascommon.redux' 

const Option = Select.Option;
const FormItem = Form.Item;


class K8sClusterSelectForm extends Component {

  componentDidMount () {
      this.props.getUserClusterList();
  }

  //重置表单
  handleReset = () => {
      this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator  } = this.props.form;
    const { handleSelctEvent } = this.props;
    return (
        <Form layout="inline" style={{float: "right", marginRight: -18}}>	
            <FormItem label="集群选择"  labelCol={{span: 6}}  wrapperCol={{ span: 18 }} >
              {getFieldDecorator('clustername')( 
                   <Select
                      showSearch
                      notFoundContent="未发现集群"
                      style={{ width: 200 }}
                      placeholder="请选择集群"
                      optionFilterProp="children"
                      onSelect={handleSelctEvent}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {this.props.clusterList.map(function(item,index,input){
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                      })}
                    </Select>					
              )}  
            </FormItem>
        </Form>

    )
  }
}

const K8sClusterSelectManage = Form.create()(K8sClusterSelectForm);
export default connect(
  state => state.PaasCommon,
  {getUserClusterList} 
)(K8sClusterSelectManage) 
