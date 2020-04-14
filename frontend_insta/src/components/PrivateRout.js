import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { Main_Content } from './Main_Content';


function PrivateRoute(props) {
        
    return (
                
        props.currentLoginState?<Route path="/home"><Main_Content {...props}/></Route>: <Redirect to='/' />
       
    )
}
export default withRouter (PrivateRoute)