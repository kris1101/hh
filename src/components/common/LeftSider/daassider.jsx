import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu, Icon } from 'antd';
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

      if(pathName=="/daas/machine"){
          openKey = ["sub2"];
      }else if(pathName=="/daas/slowquery/grouplist"||pathName=="/daas/slowquery/userlist"||pathName=="/config/userManage"){
          openKey = ["slowquery"];
      }else if(pathName=="/config/userlist"||pathName=="/config/userManage"){
          openKey = ["sub5"];
      }else if(pathName=="/config/emaillist"){
          openKey = ["sub6"];
      }else {
          openKey = [];
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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="dasktop"></i>概述</Link></Menu.Item>
            {/* <SubMenu key="sub2" title={<span><i className="engineroom"></i><span>关系型数据库</span></span>} > */}
            <SubMenu key="sub2" title={<span><Icon type="switcher" style={{ fontSize: 16, color: '#08c' }} /><span>关系型数据库</span></span>} >                
                <Menu.Item key="2"><Link to="/daas/user">概况</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/daas/instance/list">主机列表</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">实例列表</Link></Menu.Item> 
                <Menu.Item key="2"><Link to="/config/user">集群列表</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">备份日志</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">binlog进程日志</Link></Menu.Item> 
            </SubMenu>

            {/* <Menu.Item key="/config/user"><Link to="/config/user">实例</Link></Menu.Item>
                <Menu.Item key="/daas/machine"><Link to="/daas/machine">集群</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">备份</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">binlog日志</Link></Menu.Item> */}

                <SubMenu key="slowquery" title={<span><Icon type="retweet" style={{ fontSize: 16, color: '#08c' }} /><span>慢查询</span></span>} >
                <Menu.Item key="2"><Link to="/config/user">概况</Link></Menu.Item>
                <Menu.Item key="/daas/slowquery/grouplist"><Link to="/daas/slowquery/grouplist">组列表</Link></Menu.Item>
                <Menu.Item key="/daas/slowquery/userlist"><Link to="/daas/slowquery/userlist">人员列表</Link></Menu.Item> 
                <Menu.Item key="2"><Link to="/config/user">主机列表</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">邮件发送记录</Link></Menu.Item>
              </SubMenu>

            {/* <Menu.Item key="2"><Link to="/config/user">参数组</Link></Menu.Item> */}
            
            <SubMenu key="sub3" title={<span><i className="mongo"></i><span>云数据库MongoDB</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">副本集实例</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">分片集实例</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><i className="redis"></i><span>云数据库Redis</span></span>} >
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
