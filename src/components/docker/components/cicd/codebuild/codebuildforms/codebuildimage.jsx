import React from 'react'
import { message, Form, Modal, Steps} from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arta } from 'react-syntax-highlighter/styles/hljs';
import { postAjax, getAjax } from '../../../../utils/axios'
import { generateformdata } from '../../../../utils/tools_helper'

const Step = Steps.Step;

const CodeBuildImageForm = Form.create()(
  class extends React.Component {
    state ={
        current: 0,
        is_compile: "false",
        timer: null,
        codeString: "" 
    }

    handleImgeaBuild = (id) => {
      const _that = this;
      postAjax('/codetask/imagebuild/', generateformdata({task_id: id}), function(res){
            if(res.data.code === 0){
                message.success("进入任务队列") 
                console.log(res.data);
                
                _that.setState({timer : setInterval(()=>{
                  getAjax("/" + res.headers.location.split("/").slice(3).join("/"),{}, function(res){
                    _that.setState({codeString: res.data.state});
                    if(res.data.code === 0){
                      switch (res.data.state){
                         case "PROGRESS":
                           _that.setState({current: res.data.status});
                           break;
                         case "PENDING":
                           message.info("开始处理");
                           break;
                         case "SUCCESS":
                           message.success("构建成功");
                           clearInterval(_that.state.timer);
                           _that.setState({current: 4});
                           _that.setState({timer: null});
                           break;
                         case "FAILURE":
                           message.success(`构建失败${res.data.status}`);
                           clearInterval(_that.state.timer);
                           _that.setState({timer: null});
                           break;
                         default:
                          console.log("未知状态");
                      }
                    }else{
                        message.error('构建异常');
                        clearInterval(_that.state.timer);
                        _that.setState({timer: null});
                    }
                    console.log(res.data);
                  })
                }, 2000)})
            }else{
                message.error(res.data.msg) 
            }
        })
    }

    render() {
      const { visible, onCancel } = this.props;
      return (
        <Modal
          visible={visible}
          centered
          title={
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
          }
          width={900}
          maskClosable={false}
          bodyStyle={{padding: 0}}
          onCancel={onCancel}
          footer={null}
        >
          <SyntaxHighlighter language='shell' customStyle={{height: 200}} showLineNumbers style={arta}>{this.state.codeString}</SyntaxHighlighter>
        </Modal>
      );
    }
  }
)

export default CodeBuildImageForm 
