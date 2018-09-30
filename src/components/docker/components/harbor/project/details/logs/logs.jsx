import React, { Component } from 'react';
import { notification, Col, Row, DatePicker, Form, Input, Button, Select, Table } from 'antd';
  
import { connect } from 'react-redux';
import { getprojectlogs } from './TableTpl/tabletpl';
import {getProjectLogsList} from '../../../../../../../containers/Paas/harbor/projectdetails.redux'
import './logs.less';
import { compareDate } from '../../../../../utils/time_helper' 

const FormItem = Form.Item;
const Option = Select.Option;
const begin_config = {
  rules: [{ type: 'object', message: 'begin time!'  }],
};
const end_config = {
  rules: [{ type: 'object', message: 'end time!'  }],
};

class HarborProjectLogsForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getprojectlogs.call(this);
        this.project_id = this.props.project_id;
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleProjectLogsQuery = () => {
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
        page_args.begin_timestamp = value.begin_timestamp ? value.begin_timestamp.unix() : "";
        page_args.end_timestamp = value.end_timestamp ? value.end_timestamp.unix() : "";
        page_args.project_id = this.project_id;
        if (compareDate(page_args.begin_timestamp, page_args.end_timestamp)){
            this.props.getProjectLogsList(page_args);
        }else{
            notification.error({description: "结束时间必须大于起始时间"})
            return;
        }
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.projectLogs_total,
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
              page_args.username = value.username !== undefined  ? value.username : "";
              page_args.repository = value.repository !== undefined  ? value.repository : "";
              page_args.tag = value.tag !== undefined  ? value.tag : "";
              page_args.operation = value.operation  !== undefined  ? value.operation : "";
              page_args.begin_timestamp = value.begin_timestamp ? value.begin_timestamp.unix() : "";
              page_args.end_timestamp = value.end_timestamp ? value.end_timestamp.unix() : "";
              page_args.project_id = _that.project_id;
              if (compareDate(page_args.begin_timestamp, page_args.end_timestamp)){
                  _that.props.getProjectLogsList(page_args);
              }else{
                  notification.error({description: "结束时间必须大于起始时间"})
                  return;
              }
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
              page_args.begin_timestamp = value.begin_timestamp  ? value.begin_timestamp.unix() : "";
              page_args.end_timestamp = value.end_timestamp ? value.end_timestamp.unix() : "";
              page_args.project_id = _that.project_id;
              if (compareDate(page_args.begin_timestamp, page_args.end_timestamp)){
                  _that.props.getProjectLogsList(page_args);
              }else{
                  notification.error({description: "结束时间必须大于起始时间"})
                  return;
              }
          }
    };

    return (
           <div>
            <div className="form-search-box" style={{ background:'#fff', padding: 10}}>
                <Form layout="inline">
                <Row type="flex" justify="space-around">
                  <Col span={6} className="col-center">
                        <FormItem label="">
                            {getFieldDecorator('username')(
                                <Input placeholder="用户名" style={{width: 195}}/>
                            )}
                        </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                        <FormItem label="">
                            {getFieldDecorator('repository')(
                                <Input placeholder="镜像仓库" style={{width: 195}}/>
                            )}
                        </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                        <FormItem label="">
                            {getFieldDecorator('tag')(
                                <Input placeholder="标签" style={{width: 195}}/>
                            )}
                        </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                        <FormItem label="">
                            {getFieldDecorator('operation')(
                                <Select style={{ width: 195  }} showSearch placeholder="操作类型">
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
                  <Col span={6} className="col-center">
                        <FormItem label="">
          					{getFieldDecorator('begin_timestamp', begin_config)(
          					  <DatePicker placeholder="起始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
          					)}
                        </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                        <FormItem label="">
          					{getFieldDecorator('end_timestamp', end_config)(
          					  <DatePicker placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
          					)}
                        </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                    <FormItem>
                        <Button type="primary"  style={{width: 195}} onClick={this.handleProjectLogsQuery}>查询</Button>
                    </FormItem>
                  </Col>
                  <Col span={6} className="col-center">
                    <FormItem>
                        <Button style={{width: 195}} onClick={this.handleReset}>重置</Button>
                    </FormItem>
                  </Col>
                </Row>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.projectlogs_loading} rowKey={record => record.log_id} columns={this.columns} dataSource={this.props.projectLogsList} pagination={pagination} />
            </div>
        </div>
    );
  }
}


const HarborProjectLogsManage = Form.create()(HarborProjectLogsForm);
export default connect(
  state => state.harborProjectDetails,
  { getProjectLogsList })(HarborProjectLogsManage);
