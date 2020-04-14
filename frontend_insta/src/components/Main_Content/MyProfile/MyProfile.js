import React, { Component } from 'react'
import {authApi} from "../../../apicall"
import defaultImage from "../../img/DefaultProfilePic.jpg";
import ProfilePosts from './ProfilePosts';

export class MyProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userinfo:[],
            postdata:[],
            // follow:false,
            // unfollowModel:false
        }
    }
    componentDidMount(){
        this.getdata()
    }
    getdata = () => {
        authApi.post("/getdata/userinfo", {})
          .then(res => {
            this.setState({
              userinfo: res.data[0]
            });
            this.getpost()
          });
    };
    
    getpost = () => {
        console.log(this.state.userinfo.id)
    authApi.post("/getdata/otheruserposts", {
        id:this.state.userinfo.id

    })
        .then(res => {
        if (res.data == "token invalid") {
            alert("token expired");
        }
        res.data.sort(function(a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        this.setState({
            postdata: res.data
        });
        console.log(res.data);
        })
        .catch(e => {
        console.log(e.message);
        });
    };
    render() {
        return (
            <div className="MyProfile">
                <div className="MyProfile-inner">
                    <div className="MyProfile-inner-1">
                        <div className="MyProfile-inner-1-1">
                            <img
                                className="navbar_icons_3"
                                onClick={()=>{this.props.history.push("/home/profile")}}
                                src={
                                    this.state.userinfo.profilePic
                                    ? this.state.userinfo.profilePic
                                    : defaultImage
                                }
                            height="150px"
                            width="150px"
                            />
                        </div>
                        
                        <div className="MyProfile-inner-1-2">
                            <div style={{display:"flex",alignItems:"center"}}>
                                <p className="MyProfile-inner-1-2-name">{this.state.userinfo.name}</p>
                                
                                
                              
                                 
                            </div>
                            <div style={{display:"flex"}}>
                                <p><b>{this.state.postdata.length}</b> posts</p>
                                <p> <b>0</b> followers</p>
                                <p><b>0</b> following</p>
                            </div>
                        </div>

                        
                    </div>
                    <div className="MyProfile-inner-2">
                         <ProfilePosts userinfo={this.state.userinfo} postdata={this.state.postdata}/>
                    </div>



                </div>
            </div>
        )
    }
}

export default MyProfile
