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
      <canvas id='login-canvas' className='login-canvas'></canvas>
    </Layout>
  }
}
export default Login;
