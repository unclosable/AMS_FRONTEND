//redux
import menuStore from './store/reducer.js'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
//Route
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
//UI
import { Layout, message } from 'antd';
const { Content } = Layout;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//component
import Login from './main/login.jsx';
import MainHeader from './main/main.header.jsx';
import MainMenu from './main/main.menu.jsx';
import MainBreadcrumb from './main/main.breadcrumb.jsx';
import { mainViewWrapper } from './component/mainView.jsx';
import TestMain from './component/test2.jsx';
import { menuList, pathMap } from './route/index.jsx'
//login utils
import { loged, logout, logCheck } from './utils/http.js';
//transition
import '../less/transition_main.less';
const history = createHistory();

history.listen( ( location, action ) => {
  console.log( location );
  console.log( action );
} )

const middleware = routerMiddleware( history );
const store = createStore( combineReducers( Object.assign( menuStore, { router: routerReducer } ) ), applyMiddleware( middleware ) );

class MainLayout extends React.Component {
  render() {
    const routes = []
    let componentKey = 0;
    for ( let path in pathMap ) {
      if ( pathMap[ path ].component ) 
        routes.push( <Route path={path} exact={true} key={componentKey++} component={mainViewWrapper( pathMap[ path ].component )}/> )
    };

    return <Layout className="mainLayout"><MainHeader logoutFunc={this.props.logoutFunc}/>
      <Layout>
        <MainMenu/>
        <Layout style={{
            marginLeft: 200
          }}>
          <MainBreadcrumb/>
          <Content style={{
              margin: '0px 16px 0 16px',
              height: '100%',
              overflowX: 'hidden'
            }}>
            <Switch>
              {routes}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  }
}

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      login: loged()
    }
  }
  componentDidMount() {
    this.logChecking();
  }
  logChecking() {
    const thiz = this;
    const checkTime = 3000;
    const checkStep = () => {
      if ( thiz.state.login ) {
        logCheck().then( ( response ) => {
          const body = response.text().then( ( text ) => {
            if ( 'true' !== text ) {
              logout();
              this.setState( { login: false } );
              message.info( '登陆失效' );
            }
          } );
        } ).catch( () => {
          logout();
          thiz.setState( { login: false } );
          message.info( '服务器失去响应,登陆失效' );
        } );
      }
      setTimeout( checkStep, checkTime );
    }
    setTimeout( checkStep, checkTime );
  }
  render() {
    const routes = []
    let componentKey = 0;
    for ( let path in pathMap ) {
      if ( pathMap[ path ].component ) 
        routes.push( <Route path={path} exact={true} key={componentKey++} component={pathMap[ path ].component}/> )
    };
    let layout;
    if ( this.state.login ) {
      layout = <MainLayout key='1' logoutFunc={() => {
          logout();
          this.setState( { login: false } );
        }}></MainLayout>
    } else {
      layout = <Login key='2' loginFun={() => {
          this.setState( { login: true } );
        }}></Login>
    }
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <ReactCSSTransitionGroup transitionName="mainLayout" transitionAppear={true} transitionAppearTimeout={1200} transitionEnter={false} transitionLeave={false}>
          {[ layout ]}
        </ReactCSSTransitionGroup>
      </ConnectedRouter>
    </Provider>
  }
}
export default function () {
  react_dom.render( <App/>, document.getElementById( 'root' ) );
}
