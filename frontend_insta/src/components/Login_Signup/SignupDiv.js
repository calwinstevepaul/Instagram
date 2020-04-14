import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import {plainApi} from '../../apicall'


export class SignupDiv extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             signupname:'',
             signuppassword:'',
             signupemail:''
        }
    }
    eventhandle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })        
    }

    submit=()=>{
        plainApi.post("/auth/signup",{
             signupname:this.state.signupname,
             signuppassword:this.state.signuppassword,
             signupemail:this.state.signupemail
        }).then((res)=>{
            if(!res.data.success){
                swal({text : res.data.error, icon: "error"})
                this.setState({
                    signupname:'',
                    signuppassword:'',
                    signupemail:''
                })
            }
            
            
            else{
                swal({text : "Sign up Successful!!!", icon: "success"})
                this.props.changeLoginSignup(true)
            }
        }).catch((e)=>{
            alert(e);
        })
    }
    render() {
        return (
            <div >
                <div className="loginSignupDiv">
                    <div>
                        <h1 className='logoImg' ></h1>
                    </div>
                    <p className='signup_head'>Sign up to see photos and videos from your friends.</p>
                    <div className="loginSignupDiv_inner">
                        <input name="signupemail" onChange={(e)=>this.eventhandle(e)} className="loginSignupDiv_Input" placeholder="Mobile number,or email" value={this.state.signupemail}/>
                        <input name="signupname" onChange={(e)=>this.eventhandle(e)} className="loginSignupDiv_Input" placeholder="Full Name" value={this.state.signupname}/>
                        <input type="password" name="signuppassword" onChange={(e)=>this.eventhandle(e)} className="loginSignupDiv_Input" placeholder="Password" value={this.state.signuppassword}/>
                        <button className="loginSignupDiv_Button_2" onClick={()=>this.submit()}>Sign up</button>
                        <p className="loginSignupDiv_para">By signing up, you agree to our Terms , Data Policy and Cookies Policy . </p>

                    </div>
                </div>
                <div className="loginSignupDiv_Switch">
                    <p className="loginSignupDiv_para">Have an account? </p>
                    <button className="loginSignupDiv_Button" onClick={()=>this.props.changeLoginSignup(true)}>Log In</button>
                </div>
            </div>
        )
    }
}

export default SignupDiv
