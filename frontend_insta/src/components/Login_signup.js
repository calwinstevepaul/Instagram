import React, { Component } from 'react'
import LoginDiv from './Login_Signup/LoginDiv'
import SignupDiv from './Login_Signup/SignupDiv'
export class Login_signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginSignup:true
        }
    }
    changeLoginSignup=(value)=>{
        this.setState({
            loginSignup:value
        })
    }
    
    render() {
        
        return (
            <div className="loginSignup">
                <div >
                    <img className="loginSignup_outer_img"  src='https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png'/>
                    <img className="loginSignup_inner_img" src='https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg'/>
                </div>
                {this.state.loginSignup?<LoginDiv  changeLoginSignup={this.changeLoginSignup} {...this.props}/>:<SignupDiv changeLoginSignup={this.changeLoginSignup}/>}
                
                
            </div>
        )
    }
}

export default Login_signup
