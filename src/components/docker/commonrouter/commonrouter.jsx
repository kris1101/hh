import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom'
import harborProjectComponent from '../components/harbor/project/harborproject'
import harborProjectDetailsComponent from '../components/harbor/project/details/common/detailscommon'
import harborProjectRepositoriesComponent from '../components/harbor/repositories/common/detailscommon'
import harborLogComponent from '../components/harbor/logs/logs'
import harborUserComponent from '../components/harbor/user/user'
import notFoundPage from '../components/404/404page'

class PaasChildRouter extends Component {
    constructor(props) {
        super(props);
    }
  render () {
    return (
	     		<Switch>
                  <Route path={`${this.props.match.path}registryproject`} exact component={harborProjectComponent}></Route>
                  <Route path={`${this.props.match.path}registryproject/details/`} exact component={harborProjectDetailsComponent}></Route>
                  <Route path={`${this.props.match.path}registryproject/repositories/`} exact component={harborProjectRepositoriesComponent}></Route>
                  <Route path={`${this.props.match.path}registrylog`} exact component={harborLogComponent}></Route>
                  <Route path={`${this.props.match.path}registryuser`} exact component={harborUserComponent}></Route>
                  <Route component={notFoundPage}></Route>
				</Switch>	
    );
  }
}

export default PaasChildRouter 
