import React, { Component } from 'react'
import Navbar from './Main_Content/Navbar'
import News_Feed from './Main_Content/News_Feed'
import {Redirect} from 'react-router-dom'
import AddPost from './Main_Content/AddPost'
import { BrowserRouter as Router, Route, Switch,withRouter } from "react-router-dom";
import MyProfile from './Main_Content/MyProfile/MyProfile'
import OtherProfile from './Main_Content/MyProfile/OtherProfile'


export class Main_Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             addpost:false
        }
    }
    changeAddpostState=(value)=>{
        this.setState({
          addpost:value
        })
      }
    render() {

        if(this.props.currentLoginState ){
            return (
                <div>
                    <Router>
                        <Navbar {...this.props} addpost={this.state.addpost} changeAddpostState={this.changeAddpostState} />

                        <Switch>
                            <Route exact path='/home/'>
                                <News_Feed/>
                            </Route>
                            <Route exact path='/home/addpost'>
                                <AddPost {...this.props}  addpost={this.state.addpost} changeAddpostState={this.changeAddpostState}/>
                            </Route> 
                            <Route exact path='/home/profile/:name'>
                                <OtherProfile/>
                            </Route>

                        </Switch>   
                    </Router>
                </div>
            )
        }
        else{
            
            return(
                <Redirect to='/'/>
            )

        }
        
    }
}

export default withRouter (Main_Content)
