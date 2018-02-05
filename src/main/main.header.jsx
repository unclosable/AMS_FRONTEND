import { Layout, Menu, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get } from '../utils/http.js';
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MainHeader extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      username: '',
      avatar: ''
    }
  }
  componentDidMount() {
    get( '/users/info' ).then( ( response ) => {
      if ( response.status === 200 ) {
        response.json().then( ( body ) => {
          this.setState( { username: body.userName, avatar: body.avatar } );
        } )
      } else {
        throw "获取用户信息失败";
      }
    } ).catch( () => {
      message.error( '获取用户信息失败' );
    } );
  }
  render() {
    const { location, logoutFunc } = this.props;
    const { username, avatar } = this.state;
    let selectesKey = [];
    if ( location.pathname === '/' ) {
      selectesKey = [ '1' ];
    } else if ( location.pathname === '/logout' ) {
      logoutFunc();
      return <Redirect push={true} to="/"/>;
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
        <SubMenu title={<div> < img className = "login-header-img" src = {
            avatar
          } /> <p className="login-header-username">{username}</p>
        </div>}>
          <Menu.Item key="setting:1">
            <Link to="/logout">登出</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  }
}

export default connect( state => {
  return { location: state.router.location }
} )( MainHeader );
