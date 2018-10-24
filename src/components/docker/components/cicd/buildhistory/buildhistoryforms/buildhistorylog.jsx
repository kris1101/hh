import React from 'react'
import { Form, Modal } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arta } from 'react-syntax-highlighter/styles/hljs';

const BuildHistoryLogForm = Form.create()(
  class extends React.Component {

    state = {
        language: "shell",
        codeString: "",
        title: ""
    }

    render() {
      const { visible, onCancel } = this.props;
      return (
        <Modal
          visible={visible}
          centered
          bodyStyle={{padding:0}}
          title={this.state.title}
          width={900}
          maskClosable={false}
          onCancel={onCancel}
          footer={null}
        >
        <SyntaxHighlighter language={this.state.language} customStyle={{height: 300}} showLineNumbers style={arta}>{this.state.codeString}</SyntaxHighlighter>
        </Modal>
      );
    }
  }
)

export default BuildHistoryLogForm 
