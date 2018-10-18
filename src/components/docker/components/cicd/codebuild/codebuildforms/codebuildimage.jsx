import React from 'react'
import { Form, Modal, Row, Col, Steps, Divider} from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arta } from 'react-syntax-highlighter/styles/hljs';

const Step = Steps.Step;

const CodeBuildImageForm = Form.create()(
  class extends React.Component {
    state ={
        current: 0,
        is_compile: "false",
        id: null,
        timer: null,
        codeString: "" 
    }
    componentDidMount() {
      console.log(this.state);
      let i = 0;
      this.setState({timer : setInterval(()=>{
        this.setState({current: i % 5});
        i +=1;
      }, 1000)})
    }
  
    render() {
      const { visible, onCancel } = this.props;
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
                {this.state.is_compile === "true" ?
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
                <SyntaxHighlighter language='shell' customStyle={{height: 200}} showLineNumbers style={arta}>{this.state.codeString}</SyntaxHighlighter>
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
