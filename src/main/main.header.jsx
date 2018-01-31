import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
const {Header, Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MainHeader extends React.Component {
  render() {
    const {location} = this.props;
    let selectesKey = [];
    if (location.pathname === '/') {
      selectesKey = ['1'];
    }
    return <Header className="header" style={{
        height: '25px'
      }}>
      <Menu theme="dark" mode="horizontal" selectedKeys={selectesKey} style={{
          lineHeight: '25px',
          float: 'right'
        }}>
        <Menu.Item key="1">
          <Link to="/">HOME</Link>
        </Menu.Item>
        <SubMenu title={<span> < Icon type = "setting" /> admin</span>}>
          <Menu.Item key="setting:1">登出</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  }
}

export default connect(state => {
  return {location: state.router.location}
})(MainHeader);
