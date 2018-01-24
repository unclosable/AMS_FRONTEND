import '../../less/login.less';
import {message, Layout, Input, Icon, Button} from 'antd';
class Login extends React.Component {
  constructor(props) {
    super(props);
    const loginFun = props.loginFun;
    this.state = {
      userName: '',
      pwd: '',
      loginFun: loginFun
    };
  }
  emitEmpty(key) {
    // this.userNameInput.focus();
    let re = {};
    re[key] = '';
    this.setState(re);
  }
  onChangeUserName(key, e) {
    let re = {};
    re[key] = e.target.value;
    this.setState(re);
  }
  componentDidMount() {
    this.__initCanvas()
  }
  __initCanvas(canvas) {

    document.addEventListener('touchmove', function(e) {
      e.preventDefault()
    })
    var c = this.canvas,
      x = c.getContext('2d'),
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
    x.scale(pr, pr)
    x.globalAlpha = 0.6
    function i() {
      x.clearRect(0, 0, w, h)
      q = [
        {
          x: 0,
          y: h * .7 + f
        }, {
          x: 0,
          y: h * .7 - f
        }
      ]
      while (q[1].x < w + f) 
        d(q[0], q[1])
    }
    function d(i, j) {
      x.beginPath()
      x.moveTo(i.x, i.y)
      x.lineTo(j.x, j.y)
      var k = j.x + (z() * 2 - 0.25) * f,
        n = y(j.y)
      x.lineTo(k, n)
      x.closePath()
      r -= u / -50
      x.fillStyle = '#' + (
      v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
      x.fill()
      q[0] = q[1]
      q[1] = {
        x: k,
        y: n
      }
    }
    function y(p) {
      var t = p + (z() * 2 - 1.1) * f
      return (t > h || t < 0)
        ? y(p)
        : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()

  }
  __submit() {
    let {userName, pwd, loginFun} = this.state;
    if (userName === 'admin' && pwd === 'admin') {
      loginFun();
    } else {
      message.error('Wrong Login Infomation');
    }
  }
  render() {
    const {userName, pwd} = this.state;
    const userNameSuffix = userName
      ? <Icon type="close-circle" onClick={() => this.emitEmpty('userName')}/>
      : null;
    const pwdNameSuffix = pwd
      ? <Icon type="close-circle" onClick={() => this.emitEmpty('pwd')}/>
      : null;

    return <Layout className="mainLayout">
      <div id='login-input-div'>
        <div id='login-input-header'>
          <div className='icon'>AMS</div>
          <div className='sysname'>Asset Management System</div>
        </div>
        <div id='login-input-center'>
          <Input placeholder="Enter your username" prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} suffix={userNameSuffix} value={userName} onChange={(e) => {
              this.onChangeUserName('userName', e)
            }}/>
          <Input placeholder="Enter your password" type="password" prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} suffix={pwdNameSuffix} value={pwd} onChange={(e) => {
              this.onChangeUserName('pwd', e)
            }}/></div>
        <div id='login-input-submit'>
          <Button onClick={() => this.__submit()}>
            Login<Icon type="right"/>
          </Button>
        </div>
      </div>
      <canvas id='login-canvas' className='login-canvas' ref={node => this.canvas = node}></canvas>
    </Layout>
  }
}
export default Login;
