import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Login from '../src/pages/Login/Login';
import {connect} from 'react-redux';
import * as actions from './redux/actions/index';
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Students from './pages/Students/Students';
import Examinations from './pages/Examinations/Examinations';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import ModuleClassDetails from './pages/ModuleClassDetails/ModuleClassDetails';
import AddModuleClass from './pages/AddModuleClass/AddModuleClass';
import StudentDetails from './pages/StudentDetails/StudentDetails';
import ExaminationDetails from './pages/ExaminationDetails/ExaminationDetails';
import Menu from './components/Menu/Menu';
import User from './components/User/User';
import classes from './App.css';


class App extends Component {
    componentWillMount() {
        this.props.onTryAutoSignUp();
    }
    render() {
      let routes = (
        <Switch>
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
      );
      if(this.props.isAuthenticated) {
          let subRoutes = null; 
          if(this.props.role == 0) {
            subRoutes = (
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route exact path='/courses' component={Courses}/>                    
                <Route exact path='/students' component={Students}/>                    
                <Route exact path='/examinations' component={Examinations} />
                <Route exact path='/courses/courseID=:course_uuid' component={CourseDetails} />
                <Route path='/courses/module-classes/moduleClassID=:module_class_uuid' component={ModuleClassDetails}/>
                <Route path='/courses/module-classes/add-module-class' component={AddModuleClass} />
                <Route path='/students/studentID=:student_uuid' component={StudentDetails} />
                <Route path='/examinations/examinationID=:examination_semester_uuid' component={ExaminationDetails} />
              </Switch>
            )
          }
          else {
            subRoutes = (
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/dashboard' component={Dashboard} />
              </Switch>
            )
          }
          routes = (
            <div className={classes.Dashboard}>
              <Menu />
              <div className={classes.Main}>
                  <User />
                  {subRoutes}
              </div>
            </div>
          )
      }
      
      return  <div>
                {routes}
              </div>
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); 