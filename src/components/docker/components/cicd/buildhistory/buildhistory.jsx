import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { Icon, message, Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getBuildHistory } from './TableTpl/tabletpl';
import { getBuildHistoryList }  from '../../../../../containers/Paas/k8s/paasbuildhistory'
import './buildhistory.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Search = Input.Search;

class PaasBuildHistoryForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getBuildHistory.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }

    componentDidMount () {
         this.props.getBuildHistoryList();
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleBuildHistoryQuery = () => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: 1,
           pageSize: 10 
       })
       let page_args = {page: 1, page_size:10}
       page_args.search = value.task_name !== undefined  ? value.task_name : "";
       this.props.getBuildHistoryList(page_args);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: page,
                  pageSize: pageSize
              })
              let page_args = {page, page_size: pageSize}
              page_args.task_name = value.task_name !== undefined  ? value.task_name : "";
              _that.props.getBuildHistoryList(page_args);
          },
          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.task_name = value.task_name !== undefined  ? value.task_name : "";
              _that.props.getBuildHistoryList(page_args);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="CI/CD" second="持续集成" third="构建历史"/>
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" style={{ overflow: "hidden" }}>
                     <FormItem label="">
                         {getFieldDecorator('task_name')(
                             <Search
                                placeholder="构建任务名称查找"
                                onSearch={(value) => {this.handleBuildHistoryQuery()}}
                                style={{ width: 200 }}
                             />      
                         )}
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="" style={{ marginRight: 0 }}>
                          <Button  onClick={this.handleBuildHistoryQuery} type="primary">< Icon type="reload" style={{color: "white"}}/>刷新</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin" bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.buildHistoryList} pagination={pagination}/>
            </div>
        </Content>
      </Layout>
    );
  }
}


const PaasBuildHistoryManage = Form.create()(PaasBuildHistoryForm);
export default connect(
  state => state.paasBuildHistory,
  { getBuildHistoryList })(PaasBuildHistoryManage);
