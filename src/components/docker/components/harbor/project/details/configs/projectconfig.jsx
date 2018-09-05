import React from 'react'
import { Button, message, Form, Radio} from 'antd';

const FormItem = Form.Item;

class  ProjectConfigForm extends React.Component {

  render() {
    const { form, project_id } = this.props;
    const { getFieldDecorator } = form;
    console.log(project_id);
    return (
        <Form >
          <FormItem label="项目仓库"  labelCol= {{ span: 2  }} wrapperCol={{ span: 14  }}>
            {getFieldDecorator('public', {
              initialValue: 'false', rules: [{required: true}],
            })(
              <Radio.Group >
                <Radio value="true">公开</Radio>
                <Radio value="false">私有</Radio>
              </Radio.Group>
            )}
          </FormItem>
      <FormItem wrapperCol={{ span: 14 , offset:2  }}>
        <Button type="primary">Submit</Button>
      </FormItem>
        </Form>
    );
  }
}

const ProjectConfigManger = Form.create()(ProjectConfigForm);
export default  ProjectConfigManger 
