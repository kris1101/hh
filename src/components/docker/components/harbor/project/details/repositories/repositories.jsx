import React, { Component } from 'react';
import { message, Form, Input, Button, Table, Row, Col } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../../BreadcrumbCustom';
import { getrepositories } from './TableTpl/tabletpl';
import './repositories.less';
import { getRepositoriesList } from '../../../../../../../containers/Paas/harbor/projectdetails.redux'

const FormItem = Form.Item;

class HarborRepositoriesForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getrepositories.call(this);
        this.project_id = this.props.project_id;
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }

    componentDidMount () {
        this.props.getRepositoriesList({project_id: this.project_id});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleRepositoriesListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.q = value.q !== undefined ? value.q : "";
       page_args.project_id = this.project_id;
       this.props.getRepositoriesList(page_args);
    }

    handleRepositoriesQuery = () => {
      this.handleRepositoriesListWithArgs(1, 10);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.repositories_total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              _that.handleRepositoriesListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleRepositoriesListWithArgs(1, size);
          }
    };

    return (
      <div>
            <div style={{ background:'#fff', height: 55}}>
                <Form layout="inline" style={{ float:'right' }}>
                    <FormItem label="">
                        {getFieldDecorator('q')(
                            <Input placeholder="镜像仓库名称" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleRepositoriesQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.repositories_loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.repositoriesList} pagination={pagination} />
            </div>
      </div>
    );
  }
}


const HarborRepositoriesManage = Form.create()(HarborRepositoriesForm);
export default connect(
  state => state.harborProjectDetails,
  { getRepositoriesList })(HarborRepositoriesManage);
