import '../../less/login.less';
import '../../less/transition_login.less';
import { RFD, HY, switchHost, login } from '../utils/http.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  message,
  Layout,
  Input,
  Icon,
  Button,
  Spin,
  Tooltip
} from 'antd';

const LONGIN = 'LOGIN';
const FORGETPWD = 'FORGETPWD';
const LOADING = 'LOADING';

class LoginPanel extends React.Component {
  render() {
    const {
      username,
      password,
      submit,
      onChangeUserName,
      emitEmpty,
      changeMode,
      changeHost,
      checkedHost
    } = this.props;
    const userNameSuffix = username
      ? <Icon type="close-circle" onClick={() => emitEmpty( 'username' )}/>
      : null;
    const pwdNameSuffix = password
      ? <Icon type="close-circle" onClick={() => emitEmpty( 'password' )}/>
      : null;
    return <div id='login-input-div'>
      <div id='login-input-header'>
        <div className='icon'>AMS</div>
        <div className='sysname'>Asset Management System</div>
      </div>
      <div id='login-input-center'>
        <Input placeholder="Enter your username" prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} suffix={userNameSuffix} value={username} onChange={( e ) => {
            onChangeUserName( 'username', e )
          }}/>
        <Input placeholder="Enter your password" type="password" prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} suffix={pwdNameSuffix} value={password} onChange={( e ) => {
            onChangeUserName( 'password', e )
          }}/></div>
      <div id='login-companycheck'>
        <Tooltip title="如风达" placement="bottom">
          <div id="rfd-icon" onClick={() => {
              changeHost( RFD );
            }} className={checkedHost === RFD
              ? "checked"
              : ""}></div>
        </Tooltip>
        <Tooltip title="华宇" placement="bottom">
          <div id="hy-icon" onClick={() => {
              changeHost( HY );
            }} className={checkedHost === HY
              ? "checked"
              : ""}></div>
        </Tooltip>
      </div>
      <div id='login-input-submit'>
        <Button onClick={submit}>
          Login<Icon type="right"/>
        </Button>
        <Button onClick={() => {
            changeMode( FORGETPWD );
          }}>
          Forget Password
          <Icon type="frown"/>
        </Button>
      </div>
    </div>
  }
}
class ForgetPwd extends React.Component {
  render() {
    const { changeMode } = this.props;
    return <div id='login-input-div'>
      <div id='login-input-header'>
        <div className='icon'>AMS</div>
        <div className='sysname'>Asset Management System</div>
      </div>
      <div id='login-input-center'>
        <span>暂时不支持找回密码，请联系系统管理员</span>
      </div>
      <div id='login-input-submit'>
        <Button onClick={() => {
            changeMode( LONGIN );
          }}>
          OK<Icon type="right"/>
        </Button>
      </div>
    </div>
  }
}

class Loading extends React.Component {
  render() {
    const { changeMode } = this.props;
    return <div id='login-input-div'>
      <div id='login-input-header'>
        <div className='icon'>AMS</div>
        <div className='sysname'>Asset Management System</div>
      </div>
      <div id='login-input-center'>
        <Spin size="large"></Spin>
      </div>
      <div id='login-input-submit'></div>
    </div>
  }
}

class Login extends React.Component {
  constructor( props ) {
    super( props );
    const loginFun = props.loginFun;
    this.state = {
      mode: LONGIN,
      checkedHost: RFD,
      username: '',
      password: '',
      loginFun: loginFun
    };
  }
  emitEmpty( key ) {
    // this.userNameInput.focus();
    let re = {};
    re[ key ] = '';
    this.setState( re );
  }
  onChangeUserName( key, e ) {
    let re = {};
    re[ key ] = e.target.value;
    this.setState( re );
  }
  componentDidMount() {
    this.__initCanvas()
  }

  changeMode( mode ) {
    this.setState( { mode: mode } );
  }
  changeHost( HOST ) {
    switchHost( HOST );
    this.setState( { checkedHost: HOST } );
  }
  __submit() {
    let { username, password, loginFun } = this.state;
    this.changeMode( LOADING );
    login( { username, password } ).then( () => {
      message.info( 'Login Success' );
      loginFun();
    } ).catch( ( msg ) => {
      setTimeout( () => {
        message.error( 'Wrong Login Information' );
        this.changeMode( LONGIN );
      }, 3000 );
    } )
  }
  render() {
    const { username, password, mode, checkedHost } = this.state;
    let layout;
    switch ( mode ) {
      case LONGIN:
        layout = <LoginPanel key='1' username={username} checkedHost={checkedHost} password={password} submit={() => this.__submit()} onChangeUserName={( key, value ) => this.onChangeUserName( key, value )} emitEmpty={( key ) => {
            this.emitEmpty( key )
          }} changeMode={( mode ) => this.changeMode( mode )} changeHost={( HOST ) => this.changeHost( HOST )}/>
        break;
      case FORGETPWD:
        layout = <ForgetPwd key='2' changeMode={( mode ) => this.changeMode( mode )}/>
        break;
      case LOADING:
        layout = <Loading key='3'/>
        break;
      default:
        layout = <div id='login-input-div'></div>

    }
    return <Layout className="mainLayout">
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={1200} transitionEnterTimeout={1200} transitionLeaveTimeout={1200} transitionEnter={true} transitionLeave={true}>
        {[ layout ]}
      </ReactCSSTransitionGroup>
      <canvas id='login-canvas' className='login-canvas' ref={node => this.canvas = node}></canvas>
    </Layout>
  }
  __initCanvas( canvas ) {
    document.addEventListener( 'touchmove', function ( e ) {
      e.preventDefault()
    } )
    var c = this.canvas,
      x = c.getContext( '2d' ),
      pr = window.devicePixelRatio || 1,
      w = window.innerWidth,
      h = window.innerHeight,
      f = 90,
      q,
      m = Math,
      r = 0,
      u = m.PI * 2,
      v = m.cos,
      z = m.random
    c.width = w * pr
    c.height = h * pr
    x.scale( pr, pr )
    x.globalAlpha = 0.6
    function i() {
      x.clearRect( 0, 0, w, h )
      q = [
        {
          x: 0,
          y: h * .7 + f
        }, {
          x: 0,
          y: h * .7 - f
        }
      ]
      while ( q[ 1 ].x < w + f ) 
        d( q[0], q[ 1 ] )
    }
    function d( i, j ) {
      x.beginPath()
      x.moveTo( i.x, i.y )
      x.lineTo( j.x, j.y )
      var k = j.x + ( z() * 2 - 0.25 ) * f,
        n = y( j.y )
      x.lineTo( k, n )
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + ( v( r ) * 127 + 128 << 16 | v( r + u / 3 ) * 127 + 128 << 8 | v( r + u / 3 * 2 ) * 127 + 128 ).toString( 16 )
      x.fill()
      q[ 0 ] = q[ 1 ]
      q[ 1 ] = {
        x: k,
        y: n
      }
    }
    function y( p ) {
      var t = p + ( z() * 2 - 1.1 ) * f
      return ( t > h || t < 0 )
        ? y( p )
        : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()

  }
}
export default Login;
