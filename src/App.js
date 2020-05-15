import React, { Component } from 'react'
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link
} from 'react-router-dom';
import SigninPage from './SigninPage.js';
import SignupPage from './SignupPage.js';
import TodoList from './TodoList.js';
import PrivateRoute from './PrivateRoute.js';



export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (specialToken) => {
    this.setState({ token: specialToken });
    localStorage.setItem('TOKEN', specialToken)
  }


  render() {
    return (


      <div>
        <Router>
          <ul>
            { this.state.token && <div>Welcome To Your List</div> }
            { this.state.token && <Link to="/api/todo"><h1>To Do List</h1></Link> }
                <Link to="/api/auth/signin"><h1>Sign In</h1></Link>
                <Link to="/api/auth/signup"><h1>Sign Up</h1></Link>
                  <button onClick={() => this.handleTokenChange('')}>LogOut</button>
            </ul>
          <Switch>
            <Route
            path="/api/auth/signup"
            exact
            render={(routerProps) => <SignupPage {...routerProps} />}
            />
             <Route
            path="/api/auth/signin"
            exact
            render={(routerProps) => <SigninPage {...routerProps} />}
            />
            />
            <PrivateRoute
            path="/todo"
            token={this.state.token}
            exact
            render={(routerProps) => <TodoList {...routerProps} />}
            />
          </Switch>
        </Router>
        
      </div>
    )
  }
}