import {connect} from 'react-redux';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import '../../less/transition_view.less'

export const mainViewWrapper = (WrappedComponent) => {
  const transitionedComponent = (props) => {
    return <ReactCSSTransitionGroup transitionName="main-view" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={200}>
      <WrappedComponent {...props}/>
    </ReactCSSTransitionGroup>
  }
  return transitionedComponent;
}
