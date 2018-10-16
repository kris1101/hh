import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu, Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class DassSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['destop', 'rdb', 'slowquery'];
  state = {
    openKeys: [],
    current: 'destop'
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  handleClick = (e) => {
      console.log(e.key);
      this.setState({
          current: e.key
      })
  }

  componentWillMount () {
      const { location } = this.props;
      let pathName = location.pathname;
      console.log(pathName);
      let openKey = [];
      let current = pathName;

      if(pathName=="/daas/destop"){
          openKey = [];
      }else if(pathName=="/daas/slowquery/group"||pathName=="/daas/slowquery/user"||pathName=="/daas/slowquery/instance"||pathName=="/daas/slowquery/email"){
          openKey = ["slowquery"];
      }else if(pathName=="/daas/rdb/instance"||pathName=="/daas/rdb/project"||pathName=="/daas/rdb/cluster"){
          openKey = ["rdb"];
      }else {
          openKey = ["rdb"];
      }
      this.setState({current: current,openKeys: openKey});

  }

  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          defaultOpenKeys={['destop']}
          style={{ width: 200 }}
        >
            <Menu.Item key="destop"><Link to="/daas/destop"><Icon type="desktop" />概述</Link></Menu.Item>
             <SubMenu key="rdb" title={<span><Icon type="database" /><span>关系型数据库</span></span>} >
                <Menu.Item key="/daas/rdb/instance"><Link to="/daas/rdb/instance">实例</Link></Menu.Item>
                <Menu.Item key="/daas/rdb/cluster"><Link to="/daas/rdb/cluster">集群</Link></Menu.Item>
                <Menu.Item key="/daas/backup"><Link to="/daas/backup">备份</Link></Menu.Item>
                <Menu.Item key="/daas/binlog"><Link to="/daas/binlog">binlog日志</Link></Menu.Item>
                <Menu.Item key="/daas/verify"><Link to="/daas/verify">sql审核</Link></Menu.Item>
                <Menu.Item key="/daas/rdb/project"><Link to="/daas/rdb/project">项目</Link></Menu.Item>
                <Menu.Item key="/daas/parameter"><Link to="/daas/parameter">参数组</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="slowquery" title={<span><Icon type="database" /><span>慢查询</span></span>} >
                <Menu.Item key="/daas/slowquery/group"><Link to="/daas/slowquery/group">组列表</Link></Menu.Item>
                <Menu.Item key="/daas/slowquery/user"><Link to="/daas/slowquery/user">人员列表</Link></Menu.Item>
                <Menu.Item key="/daas/slowquery/instance"><Link to="/daas/slowquery/instance">实例列表</Link></Menu.Item>
                <Menu.Item key="/daas/slowquery/email"><Link to="/daas/slowquery/email">邮件发送记录</Link></Menu.Item>
             </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(DassSider);
