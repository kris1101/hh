import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class DassSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', '4', '5', '6'];
  state = {
    openKeys: [],
    current: 'sub1'
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
      }else if(pathName=="/config/userlist"||pathName=="/config/userManage"){
          openKey = ["sub5"];
      }else if(pathName=="/config/emaillist"){
          openKey = ["sub6"];
      }else {
          openKey = ["sub2"];
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
          style={{ width: 200 }}
        >
            <Menu.Item key="sub1"><Link to="/daas/destop"><Icon type="desktop" />概述</Link></Menu.Item>
             <SubMenu key="sub2" title={<span><Icon type="database" /><span>关系型数据库</span></span>} >
                <Menu.Item key="/daas/instance"><Link to="/daas/instance">实例</Link></Menu.Item>
                <Menu.Item key="/daas/cluster"><Link to="/daas/cluster">集群</Link></Menu.Item>
                <Menu.Item key="/daas/backup"><Link to="/daas/backup">备份</Link></Menu.Item>
                <Menu.Item key="/daas/binlog"><Link to="/daas/binlog">binlog日志</Link></Menu.Item>
                <Menu.Item key="/daas/cluster"><Link to="/daas/cluster">慢查询</Link></Menu.Item>
                <Menu.Item key="/daas/cluster"><Link to="/daas/cluster">sql审核</Link></Menu.Item>
                <Menu.Item key="/daas/group"><Link to="/daas/group">邮件组</Link></Menu.Item>
                <Menu.Item key="/daas/user"><Link to="/daas/user">人员列表</Link></Menu.Item>
                <Menu.Item key="/daas/email"><Link to="/daas/email">邮件记录</Link></Menu.Item>
                <Menu.Item key="/daas/cluster"><Link to="/daas/cluster">参数组</Link></Menu.Item>
            </SubMenu>
             <SubMenu key="sub3" title={<span><Icon type="api" /><span>云数据库MongoDB</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">副本集实例</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">分片集实例</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="switcher" /><span>云数据库Redis</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">实例列表</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">参数组</Link></Menu.Item>
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
