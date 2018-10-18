import React from 'react'
import { Form, Modal, Row, Col, Steps, Divider} from 'antd';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arta } from 'react-syntax-highlighter/styles/hljs';
import { getAjax  } from '../../../../utils/axios'

const Step = Steps.Step;
const codeString = '';

const CodeBuildImageForm = Form.create()(
  class extends React.Component {
    state ={
        current: 0,
        is_compile: "false",
        id:""
    }
  
    render() {
      const { visible, onCancel, form } = this.props;
      return (
        <Modal
          visible={visible}
          centered
          width={900}
          maskClosable={false}
          onCancel={onCancel}
          footer={null}
        >
          <Row>
            <Col span={24}>
            <Steps  size="small" progressDot  current={this.state.current}>
                <Step title="开始" description="开始处理,请等待..." />
                <Step title="clone代码" description="开始clone,请等待..." />
                {this.state.is_compile == "true" ?
                <Step title="编译" description="开始编译,请等待..." />
                :null}
                <Step title="构建" description="开始构建,请等待..." />
                <Step title="上传" description="构建完成,上传镜像中..." />
                <Step title="完成" description="处理完成" />
            </Steps>
            </Col>
          </Row>
            <Divider>
              日志
            </Divider>

          <Row>
            <Col span={24}>
                <SyntaxHighlighter language='shell' customStyle={{height: 200}} showLineNumbers style={arta}>{codeString}</SyntaxHighlighter>
            </Col>
          </Row>
        </Modal>
      );
    }
  }
)

//export default connect(
//  state => state.paasCodeBase,
//  { getCodeRepoList })(CodeBuildImageForm);

export default CodeBuildImageForm 
