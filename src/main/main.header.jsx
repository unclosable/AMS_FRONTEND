import
{
  Layout,
  Menu,
  Icon
}
from 'antd';
import
{
  Link
}
from 'react-router-dom';
import
{
  connect
}
from 'react-redux';
import
{
  Redirect
}
from 'react-router-dom';
const
{
  Header,
  Content,
  Sider
} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MainHeader extends React.Component
{
  render()
  {
    const
    {
      location,
      logoutFunc
    } = this.props;
    let selectesKey = [];
    if ( location.pathname === '/' )
    {
      selectesKey = [ '1' ];
    }
    else if ( location.pathname === '/logout' )
    {
      logoutFunc();
      return <Redirect push to="/"/>;
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
          <Menu.Item key="setting:1">
            <Link to="/logout">登出</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  }
}

export default connect( state =>
{
  return {
    location: state.router.location
  }
} )( MainHeader );
