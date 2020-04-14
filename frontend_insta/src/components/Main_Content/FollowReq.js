import React, { Component } from 'react'
import defaultImage from "../img/DefaultProfilePic.jpg";
import { authApi } from "../../apicall";



export class FollowReq extends Component {

    acceptFriendRequest=(id)=>{
        authApi.post("/update/acceptfriendrequest", { userId: id })
        .then(res=>{
            console.log(res)
            this.props.getFollowRequest()
        })
    }
    deleteFriendRequest=(id)=>{
        authApi.post("/update/deletefriendrequest", { userId: id })
        .then(res=>{
            console.log(res)
            this.props.getFollowRequest()
        })
    }
    render() {
        return (
            <div  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px"}}>
                <div style={{display:"flex",alignItems:"center",width:"60%"}}>
                    <img
                    className="navbar_icons_3"
                    src={
                        this.props.followReqData.user.profilePic ? this.props.followReqData.user.profilePic : defaultImage
                    }
                    style={{marginRight:"7px"}}
                    height="35px"
                    width="35px"
                    />
                    <b> {this.props.followReqData.user.name}</b>
                </div>
                <div>
                    <button onClick={()=>this.acceptFriendRequest(this.props.followReqData.userId)} style={{margin:"5px"}} className="logout-btn">Accept</button>
                    <button onClick={()=>this.deleteFriendRequest(this.props.followReqData.userId)} className="logout-btn-dark">Delete</button>
                    
                </div>    

            </div>
        )
    }
}

export default FollowReq
