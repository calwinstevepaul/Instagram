import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {plainApi} from '../../apicall'

export class LoginDiv extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loginname:'',
            loginpassword:'',
            errormsg:''
        }
    }
    
    eventhandle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=()=>{
        
        plainApi.post("/auth/login",{
            loginname:this.state.loginname,
            loginpassword:this.state.loginpassword
        }).then(res => {
            if(res.data.message == "login successful") {
                localStorage.setItem("token",res.data.token)
                this.props.changeLoginState(true)
                this.props.history.push('/home')
            }
            else{
                this.setState({
                    err:'*'+res.data
                })
                setTimeout(() => {
                    this.setState({
                        err:''
                    })
                }, 3000);
            }
        }).catch((e)=>{
            console.log('error',e);
            alert(e.message)
        })
        
    }
    render() {

        return (
            <div >
                <div className="loginSignupDiv">
                    <div>
                        <h1 className='logoImg' ></h1>
                    </div>
                    <div className="loginSignupDiv_inner">
                        <p className='error'>{this.state.err}</p>
                        <input className="loginSignupDiv_Input" placeholder="Phone number, username or email" name="loginname" onChange={(e)=>this.eventhandle(e)}/>
                        <input type="password" className="loginSignupDiv_Input" placeholder="Password" name="loginpassword" onChange={(e)=>this.eventhandle(e)}/>
                        <button onClick={()=>this.submit()} className="loginSignupDiv_Button_2">Log In</button>
                        <p className="loginSignupDiv_para">Forgot password?</p>

                    </div>
                    <p className="loginSignupDiv_para">Get the app</p>

                    <div className="loginSignuplinks">
                        <a href="https://apps.apple.com/us/app/instagram/id389801252"><img width="116px" height="35px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"/></a>
                        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en"><img width="116px" height="35px" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"/></a>
                    </div>
                </div>
                <div className="loginSignupDiv_Switch">
                    <p className="loginSignupDiv_para">Don't have an account? </p>
                    <button className="loginSignupDiv_Button" onClick={()=>this.props.changeLoginSignup(false)}>Signup</button>
                </div>
            </div>
        )
    }
}

export default withRouter (LoginDiv)    