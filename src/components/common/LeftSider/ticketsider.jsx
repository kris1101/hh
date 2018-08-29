import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
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
      
      if(pathName=="/ticket/wait"||pathName=="/ticket/complete"||pathName=="/ticket/delete"||pathName=="/ticket/cancel"){
          openKey = ["sub3"];
      }else if(pathName=="/ticket/type"||pathName=="/ticket/object"){
          openKey = ["sub4"];
      }else if(pathName=="/ticket/user"||pathName=="/ticket/group"){
          openKey = ["sub5"];
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
            <Menu.Item key="sub1"><Link to="/config/device"><Icon type="desktop" />概述</Link></Menu.Item>
             <SubMenu key="sub3" title={<span><Icon type="file-text" /><span>工单管理</span></span>} >
                <Menu.Item key="/ticket/wait"><Link to="/ticket/wait">待处理</Link></Menu.Item>
                <Menu.Item key="/ticket/complete"><Link to="/ticket/complete">已完成</Link></Menu.Item>
                <Menu.Item key="/ticket/cancel"><Link to="/ticket/cancel">已撤销</Link></Menu.Item>
                <Menu.Item key="/ticket/delete"><Link to="/ticket/delete">已删除</Link></Menu.Item>
            </SubMenu>
             <SubMenu key="sub4" title={<span><Icon type="file-add" /><span>定制管理</span></span>} >
                <Menu.Item key="/ticket/type"><Link to="/ticket/type">工单类型</Link></Menu.Item>
                <Menu.Item key="/ticket/object"><Link to="/ticket/object">工单对象</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><Icon type="solution" /><span>通讯录</span></span>} >
                <Menu.Item key="/ticket/group"><Link to="/ticket/group">通讯组</Link></Menu.Item>
                <Menu.Item key="/ticket/user"><Link to="/ticket/user">联系人</Link></Menu.Item>
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
