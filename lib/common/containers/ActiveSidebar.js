import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import { login, logout, resetPassword } from '../../manager/actions/user'
import { setActiveProject } from '../../manager/actions/projects'
import { setActiveLanguage } from '../../manager/actions/languages'
import { setJobMonitorVisible, removeRetiredJob, startJobMonitor } from '../../manager/actions/status'
import { setSidebarExpanded, setTutorialHidden } from '../../manager/actions/ui'

const mapStateToProps = (state, ownProps) => {
  return {
    expanded: state.ui.sidebarExpanded,
    hideTutorial: state.ui.hideTutorial,
    username: state.user.profile ? state.user.profile.email : null,
    // userPicture: state.user.profile ? state.user.profile.picture : null,
    userIsAdmin: state.user.profile && state.user.permissions.isApplicationAdmin(),
    profile: state.user.profile,
    projects: state.projects ? state.projects : null,
    languages: state.languages ? state.languages : ['English', 'Español', 'Français'],
    jobMonitor: state.status.jobMonitor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginHandler: () => { dispatch(login()) },
    logoutHandler: () => { dispatch(logout()) },
    resetPassword: () => { dispatch(resetPassword()) },
    setActiveProject: (project) => { dispatch(setActiveProject(project)) },
    setActiveLanguage: (language) => { dispatch(setActiveLanguage(language)) },
    setJobMonitorVisible: (visible) => { dispatch(setJobMonitorVisible(visible)) },
    startJobMonitor: (showMonitor) => { dispatch(startJobMonitor(showMonitor)) },
    removeRetiredJob: (job) => { dispatch(removeRetiredJob(job)) },
    setSidebarExpanded: (value) => { dispatch(setSidebarExpanded(value)) },
    setTutorialHidden: (value) => { dispatch(setTutorialHidden(value)) }
  }
}

var ActiveSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export default ActiveSidebar
