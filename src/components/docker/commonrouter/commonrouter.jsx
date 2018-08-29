import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom'
import harborprojectcomponent from '../components/harbor/project/harborproject'
import harborlogcomponent from '../components/harbor/logs/logs'
import notfoundpage from '../components/404/404page'

class PaasChildRouter extends Component {
    constructor(props) {
        super(props);
    }
  render () {
    return (
	     		<Switch>
                  <Route path={`${this.props.match.path}registryproject`} component={harborprojectcomponent}></Route>
                  <Route path={`${this.props.match.path}registrylog`} component={harborlogcomponent}></Route>
                  <Route component={notfoundpage}></Route>
				</Switch>	
    );
  }
}

export default PaasChildRouter 
