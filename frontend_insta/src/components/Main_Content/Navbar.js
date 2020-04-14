import React, { Component } from "react";
import Heart from "../img/heart.png";
import People from "../img/icons8-people-64.png";
import compass from "../img/icons8-compass-24.png";
import { withRouter } from "react-router-dom";
import { authApi } from "../../apicall";
import defaultImage from "../img/DefaultProfilePic.jpg";

import News_Feed from "./News_Feed";
import FollowReq from "./FollowReq";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      // addpost: false,
      userinfo: [],
      search: "",
      otherusers: [],
      dropdown: true,
      followReqDropdown: false,
      followReqData:[]
    };
  }
  
  componentDidMount() {
    this.getdata();
    this.getFollowRequest()
  }

  
  getdata = () => {
    authApi.post("/getdata/userinfo", {}).then(res => {
      this.setState({
        userinfo: res.data[0]
      });
      

      // console.log(res)
    });
  };

 
  addpost = () => {
    if (!this.props.addpost) {
      this.props.history.push("/home/addpost");
      this.props.changeAddpostState(true)
      // this.setState({ addpost: !this.state.addpost });
    } else {
      this.props.history.push("/home/");
      this.props.changeAddpostState(false)
      // this.setState({ addpost: !this.state.addpost });
    }
  };

  handelUser = e => {
    this.setState({
      search: e.target.value
    });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getOtherUsers();
    }, 500);
  };
  getOtherUsers = () => {
    if (this.state.search.trim() != "") {
      this.setState({ dropdown: false });
      authApi
        .post("/getdata/otherusers", {
          key: this.state.search
        })
        .then(res => {
          console.log(res);
          this.setState({
            otherusers: res.data,
            dropdown: false
          });
        });
    } else {
      this.setState({ dropdown: true });
    }
  };
  visitProfile = (id,name) => {
    console.log(id);
    this.setState({ dropdown: true })
    this.props.history.push({pathname:"/home/profile/"+name,state:{name:id}})
  };
  getFollowRequest=()=>{
    authApi.post("getdata/followreq",{})
    .then((res)=>{
      console.log("getFollowRequest::",res)
      this.setState({
        followReqData:res.data
      })
      
    })
  }


  render() {
    return (
      <div className="navbar">
        <div className="navbar_inner">
          <h1
            onClick={() => {
              this.props.history.push("/home/");
            }}
            className="logoImg2"
          ></h1>
          <div>
            
            <div>
              {" "}
              <input
                className="loginSignupDiv_Input"
                placeholder="Search"
                onChange={this.handelUser}
              />
              {this.state.dropdown ? (
                ""
              ) : (
                <div className="searchSuggestion">
                  {this.state.otherusers.map(value => {
                    return (
                    <div>
                        <div className="searchSuggestion-outer" onClick={() => this.setState({ dropdown: true })}></div>
                        <div
                        className="searchSuggestionElement"
                        onClick={e => {
                            this.visitProfile(value.id,value.name);
                        }}>
                            <img
                            className="navbar_icons_3"
                            src={
                                value.profilePic ? value.profilePic : defaultImage
                            }
                            height="25px"
                            width="25px"
                            />
                            <b> {value.name}</b>
                        </div>
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="navbar_icons">
            <img
              className="navbar_icons_1"
              src={compass}
              height="25px"
              width="25px"
              onClick={() => {
                this.props.history.push("/home/");
              }}
            />
            <div >
              <img
                className="navbar_icons_2"
                src={Heart}
                height="25px"
                width="25px"
                onClick={()=>this.setState({followReqDropdown:!this.state.followReqDropdown})}
              />
              {this.state.followReqDropdown?
                this.state.followReqData.length!=0 ? 
                  <div>
                    <div className="followReq-close"  onClick={()=>this.setState({followReqDropdown:false})}>
                    
                    </div>
                    <div className="followReq">
                      {this.state.followReqData.map(data=>{
                      return(
                        <FollowReq
                        followReqData={data}
                        getFollowRequest={this.getFollowRequest}
                        />
                      )
                      
                    })}
                    </div> 
                  </div>
                  :
                  <div>
                    <div className="followReq-close"  onClick={()=>this.setState({followReqDropdown:false})}>
                    
                    </div>
                    <div className="followReq_noreq">
                      No Follow Request
                    </div>
                  </div>  

                
              :
              ""
              }
            </div>
            <img
              className="navbar_icons_3"
              onClick={() => {
                this.props.history.push({pathname:"/home/profile/"+this.state.userinfo.name,state:{name:this.state.userinfo.id}})
              }}
              src={
                this.state.userinfo.profilePic
                  ? this.state.userinfo.profilePic
                  : defaultImage
              }
              height="25px"
              width="25px"
            />
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              this.props.changeLoginState(false);
              localStorage.clear();
            }}
          >
            Sign out
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              this.addpost();
            }}
          >
            {this.props.addpost ? "News Feed" : "Add Post"}

          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
