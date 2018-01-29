//redux
import menuStore from './store/reducer.js'
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux'
//Route
import createHistory from 'history/createBrowserHistory'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
//UI
import {Layout} from 'antd';
const {Content} = Layout;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//component
import Login from './main/login.jsx';
import MainHeader from './main/main.header.jsx';
import MainMenu from './main/main.menu.jsx';
import MainBreadcrumb from './main/main.breadcrumb.jsx';
import {mainViewWrapper} from './component/mainView.jsx';
import TestMain from './component/test2.jsx';
import {menuList, pathMap} from './route/index.jsx'
//login utils
import {loged} from './utils/http.js';
//transition
import '../less/transition_main.less';
const history = createHistory();

history.listen((location, action) => {
  console.log(location);
  console.log(action);
})

const middleware = routerMiddleware(history);
const store = createStore(combineReducers(Object.assign(menuStore, {router: routerReducer})), applyMiddleware(middleware));

// class Demo extends React.Component {
//   render() {
//     return <Provider store={store}>
//       <Router>
//         <MuiThemeProvider>
//           <div className="main">
//             <LeftBar/>
//             <MainTopLinearProgress/>
//             <Switch>
//               <Route exact="exact" path='/' component={Hello}/>
//               <Route path='/test1' component={Test1}/>
//               <Route path='/sort' component={Sort}/>
//               <Route path='/contribute' component={ContributePanel}/>
//               <Route path='/offer' component={Offer}/>
//             </Switch>
//           </div>
//         </MuiThemeProvider>
//       </Router>
//     </Provider>;
//   }
// }

class MainLayout extends React.Component {
  render() {
    const routes = []
    let componentKey = 0;
    for (let path in pathMap) {
      if (pathMap[path].component) 
        routes.push(<Route path={path} exact={true} key={componentKey++} component={mainViewWrapper(pathMap[path].component)}/>)
    };

    return <Layout className="mainLayout"><MainHeader/>
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
  constructor(props) {
    super(props);
    this.state = {
      login: loged()
    }
  }
  render() {
    const routes = []
    let componentKey = 0;
    for (let path in pathMap) {
      if (pathMap[path].component) 
        routes.push(<Route path={path} exact={true} key={componentKey++} component={pathMap[path].component}/>)
    };
    let layout;
    if (this.state.login) {
      layout = <MainLayout key='1'></MainLayout>
    } else {
      layout = <Login key='2' loginFun={() => {
          this.setState({login: true});
        }}></Login>
    }
    return <Provider store={store}>
      <ConnectedRouter history={history}>
        <ReactCSSTransitionGroup transitionName="mainLayout" transitionAppear={true} transitionAppearTimeout={1200} transitionEnter={false} transitionLeave={false}>
          {[layout]}
        </ReactCSSTransitionGroup>
      </ConnectedRouter>
    </Provider>
  }
}
export default function() {
  react_dom.render(<App/>, document.getElementById('root'));
}
