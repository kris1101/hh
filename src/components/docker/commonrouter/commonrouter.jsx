import React, { Component } from 'react';
import { Route, Switch  } from 'react-router-dom'
import harborProjectComponent from '../components/harbor/project/harborproject'
import harborProjectDetailsComponent from '../components/harbor/project/details/common/detailscommon'
import harborProjectRepositoriesComponent from '../components/harbor/repositories/common/detailscommon'
import harborLogComponent from '../components/harbor/logs/logs'
import harborUserComponent from '../components/harbor/user/user'
import harborConfigurationsComponent from '../components/harbor/configurations/common/configurations'
import k8sClusterComponent from '../components/k8s/kubeconfig/kubeconfig'
import k8sTillerComponent from '../components/k8s/helm/tillerconfig/tillerconfig'
import k8sHelmRepoComponent from '../components/k8s/helm/repomanage/repomanage'
import k8sHelmChartComponent from '../components/k8s/helm/chartmanage/chartmanage'
import k8sHelmReleaseComponent from '../components/k8s/helm/releasemanage/releasemanage'
import k8sHelmTaskStateComponent from '../components/k8s/helm/taskstate/taskstate'
import k8sWorkloadPodsComponent from '../components/k8s/workload/pods'
import PaasCodeBaseComponent from '../components/cicd/codebase/codebase'
import PaasCodeBuildTaskComponent from '../components/cicd/codebuild/codebuild'
import PaasBuildHistoryForm from '../components/cicd/buildhistory/buildhistory'
import ApplicationManageForm from '../components/applicationdelivery/application/appmanage'
import MonitorCenterManageForm from '../components/monitorcenter/monitorcenter'
import NodeManagementForm from '../components/k8s/nodemanagement/nodemanagement'
import notFoundPage from '../components/404/404page'

class PaasChildRouter extends Component {
  render () {
    return (
	     		<Switch>
                  <Route path={`${this.props.match.path}registryproject`} exact component={harborProjectComponent}></Route>
                  <Route path={`${this.props.match.path}registryproject/details/`} exact component={harborProjectDetailsComponent}></Route>
                  <Route path={`${this.props.match.path}registryproject/repositories/`} exact component={harborProjectRepositoriesComponent}></Route>
                  <Route path={`${this.props.match.path}registrylog`} exact component={harborLogComponent}></Route>
                  <Route path={`${this.props.match.path}registryuser`} exact component={harborUserComponent}></Route>
                  <Route path={`${this.props.match.path}registryconfig`} exact component={harborConfigurationsComponent}></Route>
                  <Route path={`${this.props.match.path}clustersettings`} exact component={k8sClusterComponent}></Route>
                  <Route path={`${this.props.match.path}tillerconfig`} exact component={k8sTillerComponent}></Route>
                  <Route path={`${this.props.match.path}helmrepomanage`} exact component={k8sHelmRepoComponent}></Route>
                  <Route path={`${this.props.match.path}helmchartmanage`} exact component={k8sHelmChartComponent}></Route>
                  <Route path={`${this.props.match.path}helmreleasemanage`} exact component={k8sHelmReleaseComponent}></Route>
                  <Route path={`${this.props.match.path}helmtaskstate`} exact component={k8sHelmTaskStateComponent}></Route>
                  <Route path={`${this.props.match.path}codebase`} exact component={PaasCodeBaseComponent}></Route>
                  <Route path={`${this.props.match.path}codeimagebuild`} exact component={PaasCodeBuildTaskComponent}></Route>
                  <Route path={`${this.props.match.path}codebuildhistory`} exact component={PaasBuildHistoryForm}></Route>
                  <Route path={`${this.props.match.path}monitorcenter`} exact component={MonitorCenterManageForm}></Route>
                  <Route path={`${this.props.match.path}application`} exact component={ApplicationManageForm}></Route>
                  <Route path={`${this.props.match.path}nodemanagement`} exact component={NodeManagementForm}></Route>

                  <Route path={`${this.props.match.path}workload/podlist`} exact component={k8sWorkloadPodsComponent}></Route>
                  <Route component={notFoundPage}></Route>
				</Switch>	
    );
  }
}

export default PaasChildRouter 
