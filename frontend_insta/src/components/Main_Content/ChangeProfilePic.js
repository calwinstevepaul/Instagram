import React, { Component } from 'react'
import defaultImage from "../img/DefaultProfilePic.jpg";
import {authApi} from "../../apicall"

export class ChangeProfilePic extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            profilePic: [],
            profilePicUplode: false,
        }
    }
    sendProfilePic = () => {
        const formdata = new FormData();
        formdata.append("myimage", this.state.profilePic);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          }
        };
        authApi.post("/update/profile_pic", formdata, config)
          .then(res => {
            console.log("image", res.data);
            this.setState({ profilePicUplode: false });
            this.props.getdata();
        });
    };
  
    render() {
        
        return (
            <div>
                {this.state.profilePicUplode ? (
                <div className="loginInfo">
                    <input
                    type="file"
                    name="myimage"
                    onChange={e => {
                        this.setState({ profilePic: e.target.files[0] });
                    }}
                    />
                    <button className="loginInfo-btn" onClick={this.sendProfilePic}>
                    Submit
                    </button>
                </div>
                ) : (
                <div className="loginInfo">
                    <img
                    className="loginInfo-img"
                    src={
                        this.props.userinfo.profilePic
                        ? this.props.userinfo.profilePic
                        : defaultImage
                    }
                    height="60px"
                    width="60px"
                    />
                    <div>
                    <p>
                        <b>{this.props.userinfo.name}</b>
                    </p>
                    <button
                        className="loginInfo-btn"
                        onClick={() => this.setState({ profilePicUplode: true })}
                    >
                        Change Profile Pic
                    </button>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default ChangeProfilePic
