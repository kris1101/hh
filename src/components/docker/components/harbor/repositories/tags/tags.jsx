import React, { Component } from 'react';
import { message, Form, Input, Button, Table, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { getrepositoriestags } from './TableTpl/tabletpl';
import './tags.less';
import { getRepositoriesTagsList } from '../../../../../../containers/Paas/harbor/projectdetails.redux'
import { getHarborSysteminfo } from '../../../../../../containers/Paas/harbor/configurations.redux'

class HarborRepositoriesTagsForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getrepositoriestags.call(this);
        this.repo_name = this.props.repo_name;
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }

    componentDidMount () {
        this.props.getHarborSysteminfo({});
        this.props.getRepositoriesTagsList({repo_name: this.repo_name});
    }
    handleRepositoriesTagsQuery = (page, pagesize) => {
          this.setState({
            currentPage: page,
            pageSize: pagesize
          })
          this.props.getRepositoriesTagsList({repo_name: this.repo_name, page: page, pagesize: pagesize});
      }

  render() {
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.repositoriestags_total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              _that.handleRepositoriesTagsQuery(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleRepositoriesTagsQuery(1, size);
          }
    };

    return (
            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.repositoriestags_loading} rowKey={record => record.digest} columns={this.columns} dataSource={this.props.repositoriesTagsList} pagination={pagination} />
            </div>
    );
  }
}


const HarborRepositoriesTagsManage = Form.create()(HarborRepositoriesTagsForm);
export default connect(
  state => ({...state.harborProjectDetails, ...state.harborConfigurations}),
  { getRepositoriesTagsList, getHarborSysteminfo })(HarborRepositoriesTagsManage);
