import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { Col, Row, DatePicker, Layout, Form, Input, Button, Select, Table } from 'antd';
  
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getlogs } from './TableTpl/tabletpl';
import './logs.less';
import { getLogsList } from '../../../../../containers/Paas/harbor/logs.redux'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const begin_config = {
  rules: [{ type: 'object', message: 'begin time!'  }],
};
const end_config = {
  rules: [{ type: 'object', message: 'end time!'  }],
};

class HarborLogsForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getlogs.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }
    componentDidMount () {
        this.props.getLogsList({});
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleLogsQuery = () => {
        let value = this.props.form.getFieldsValue()
        this.setState({
            currentPage: 1,
            pageSize: 10 
        })
        let page_args = {page: 1, pagesize: 10}
        page_args.username = value.username !== undefined  ? value.username : "";
        page_args.repository = value.repository !== undefined  ? value.repository : "";
        page_args.tag = value.tag !== undefined  ? value.tag : "";
        page_args.operation = value.operation  !== undefined  ? value.operation : "";
        page_args.begin_timestamp = value.begin_timestamp !== undefined  ? value.begin_timestamp.format('X') : "";
        page_args.end_timestamp = value.end_timestamp !== undefined  ? value.end_timestamp.format('X') : "";
        this.props.getLogsList(page_args);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: page,
                  pageSize: pageSize
              })
              let page_args = {page, page_size: pageSize}
              page_args.username = value.username !== undefined  ? value.username : "";
              page_args.repository = value.repository !== undefined  ? value.repository : "";
              page_args.tag = value.tag !== undefined  ? value.tag : "";
              page_args.operation = value.operation  !== undefined  ? value.operation : "";
              page_args.begin_timestamp = value.begin_timestamp !== undefined  ? value.begin_timestamp.format('X') : "";
              page_args.end_timestamp = value.end_timestamp !== undefined  ? value.end_timestamp.format('X') : "";
              _that.props.getLogsList(page_args);
          },
          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.username = value.username !== undefined  ? value.username : "";
              page_args.repository = value.repository !== undefined  ? value.repository : "";
              page_args.tag = value.tag !== undefined  ? value.tag : "";
              page_args.operation = value.operation  !== undefined  ? value.operation : "";
              page_args.begin_timestamp = value.begin_timestamp !== undefined  ? value.begin_timestamp.format('X') : "";
              page_args.end_timestamp = value.end_timestamp !== undefined  ? value.end_timestamp.format('X') : "";
              _that.props.getLogsList(page_args);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="日志" />
            <div className="form-search-box" style={{ background:'#fff', padding: 10}}>
                <Form layout="inline">
                <Row type="flex" justify="space-around">
                  <Col span={5}>
                        <FormItem label="">
                            {getFieldDecorator('username')(
                                <Input placeholder="用户名" />
                            )}
                        </FormItem>
                  </Col>
                  <Col span={5}>
                        <FormItem label="">
                            {getFieldDecorator('repository')(
                                <Input placeholder="镜像仓库" />
                            )}
                        </FormItem>
                  </Col>
                  <Col span={5}>
                        <FormItem label="">
                            {getFieldDecorator('tag')(
                                <Input placeholder="标签" />
                            )}
                        </FormItem>
                  </Col>
                  <Col span={5}>
                        <FormItem label="">
                            {getFieldDecorator('operation')(
                                <Select style={{ width: 174  }} showSearch placeholder="操作类型">
                                  <Option value="delete">delete</Option>
                                  <Option value="pull">pull</Option>
                                  <Option value="push">push</Option>
                                  <Option value="create">create</Option>
                                </Select>
                            )}
                        </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around">
                  <Col span={5}>
                        <FormItem label="">
          					{getFieldDecorator('begin_timestamp', begin_config)(
          					  <DatePicker placeholder="begin time" showTime format="YYYY-MM-DD HH:mm:ss" />
          					)}
                        </FormItem>
                  </Col>
                  <Col span={5}>
                        <FormItem label="">
          					{getFieldDecorator('end_timestamp', end_config)(
          					  <DatePicker placeholder="end time" showTime format="YYYY-MM-DD HH:mm:ss" />
          					)}
                        </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem>
                        <Button type="primary"  style={{width: 174}} onClick={this.handleLogsQuery}>查询</Button>
                    </FormItem>
                  </Col>
                  <Col span={5}>
                    <FormItem>
                        <Button style={{width: 174}} onClick={this.handleReset}>重置</Button>
                    </FormItem>
                  </Col>
                </Row>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.log_id} columns={this.columns} dataSource={this.props.logsList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HarborLogsManage = Form.create()(HarborLogsForm);
export default connect(
  state => state.harborLogs,
  { getLogsList })(HarborLogsManage);
