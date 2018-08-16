import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class TicketSider extends Component{
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
      this.setState({
          current: e.key
      })
  }
  componentWillMount () {
      const { location } = this.props;
      let pathName = location.pathname;

      let openKey = [];
      let current = pathName;
      
      if(pathName=="/vm/backup"||pathName=="/vm/snapshot"){
          openKey = ["sub4"];
      }else if(pathName=="/vm/network/ip"||pathName=="/vm/network/load"||pathName=="/vm/network/safety"||pathName=="/vm/network/virtual"){
          openKey = ["sub7"];
      }else if(pathName=="/vm/disk"||pathName=="/vm/disk/backup"){
          openKey = ["sub8"];
      }else{
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
             <SubMenu key="sub3" title={<span><i className="snippets"></i><span>工单管理</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">待处理</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">已完成</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">已撤销</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">已删除</Link></Menu.Item>
            </SubMenu>
             <SubMenu key="sub4" title={<span><i className="diff"></i><span>定制管理</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">工单类型</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">工单对象</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><i className="solution"></i><span>通讯录</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">通讯组</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">联系人</Link></Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(TicketSider);
