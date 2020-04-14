import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Login_signup from './components/Login_signup';
import Main_Content from './components/Main_Content';
import AddPost from './components/Main_Content/AddPost'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Main_Content/Navbar';
import PrivateRoute from './components/PrivateRout';




export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       login:localStorage.getItem('token')?true:false
    }
  }
  changeLoginState=(value)=>{
    this.setState({
      login:value
    })
    
  }
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login_signup changeLoginState={this.changeLoginState} />
            </Route>            
            <PrivateRoute path="/home" changeLoginState={this.changeLoginState} currentLoginState={this.state.login}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

