import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class SettingSider extends Component{
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

      if(pathName==="/vm/backup"||pathName==="/vm/snapshot"){
          openKey = ["sub4"];
      }else if(pathName==="/vm/network/ip"||pathName==="/vm/network/load"||pathName==="/vm/network/safety"||pathName==="/vm/network/virtual"){
          openKey = ["sub7"];
      }else if(pathName==="/vm/disk"||pathName==="/vm/disk/backup"){
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
            <SubMenu key="sub3" title={<span><i className="icon4"></i><span>个人消息中心</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">已读消息</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">未读消息</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="sub1"><Link to="/config/device"><i className="dasktop"></i>个人资料</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/device"><i className="dasktop"></i>操作日志</Link></Menu.Item>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(SettingSider);
