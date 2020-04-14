import React, { Component } from "react";
import { authApi } from "../../../apicall";
import defaultImage from "../../img/DefaultProfilePic.jpg";
import ProfilePosts from "./ProfilePosts";
import { withRouter } from "react-router-dom";
import privateAccountImg from "../../img/privateImage.jpg"

export class OtherProfile extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      userinfo: [],
      postdata: [],
      following: [],
      followers: [],
      follow: false,
      unfollowModel: false,
      privateAccount: false,
      status:true,
      dataid: null,
      currentuser: null,
      ownaccount:false
    };
  }
  componentDidMount() {
    this.getdata(this.props.location.state.name);
    this.getpost(this.props.location.state.name);
    this.getfollowing(this.props.location.state.name);
    this.getfollower(this.props.location.state.name);
    this.isfollower(this.props.location.state.name);    
    
  }
  getfollowing = id => {
    authApi.post("/getdata/getfollowing", { id: id }).then(res => {
      // console.log("getfollowers::",res)
      this.setState({ following: res.data });
    });
  };
  getfollower = id => {
    authApi.post("/getdata/getfollower", { id: id }).then(res => {
      // console.log("getfollowers::",res)
      this.setState({ followers: res.data });
    });
  };
  isfollower = id => {
    authApi.post("/getdata/isfollowerstate", { followerId: id }).then(res => {
      console.log(res.data)
      this.setState({ follow: res.data.follow,status:res.data.status });
    });
  };

  getdata = (id) => {
    this.setState({ dataid: id });
    authApi
      .post("/getdata/otheruserinfo", {
        id: id
      })
      .then((res) => {
        //   console.log(res)
          this.setState({
          userinfo: res.data.profile[0],
          currentuser: res.data.current_id
        });
        // console.log(this.state.currentuser , this.props.location.state.name)
        if(this.state.currentuser == this.props.location.state.name){
          console.log("setting state")
          this.setState({
            ownaccount:true
          })
        }
        else
        {
          this.setState({
            ownaccount:false
          })

        }
     this.getpost(this.props.location.state.name);

      });


  };

  getpost = id => {

      authApi
        .post("/getdata/otheruserposts", {
          id: id
        })
        .then(res => {
          res.data.sort(function(a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          this.setState({
            postdata: res.data
          });
          // console.log(res.data);
        })
        .catch(e => {
          console.log(e.message);
        });
    
  };

  addfollowers = id => {
    var status = true;
    if (this.state.userinfo.isprivate) {
      status = false;
    }
    authApi
      .post("/update/addfollowers", {
        followerId: id,
        status: status
      })
      .then(() => {
        
        this.getpost(this.props.location.state.name);
        this.getfollowing(this.props.location.state.name);
        this.getfollower(this.props.location.state.name);
        this.isfollower(this.props.location.state.name);

      });
  };
  removefollowers = id => {
    authApi.post("/update/removefollowers", { followerId: id }).then(() => {
      this.getpost(this.props.location.state.name);
      this.getfollowing(this.props.location.state.name);
      this.getfollower(this.props.location.state.name);
      this.isfollower(this.props.location.state.name);

    });
  };
  render() {
    if (this.state.dataid != this.props.location.state.name) {
      this.getdata(this.props.location.state.name);
      this.getpost(this.props.location.state.name);
      this.getfollowing(this.props.location.state.name);
      this.isfollower(this.props.location.state.name);
      this.getfollower(this.props.location.state.name);
    }
    return (  
       
        <div className="MyProfile">
        <div className="MyProfile-inner">
            <div className="MyProfile-inner-1">
            <div className="MyProfile-inner-1-1">
                <img
                className="navbar_icons_3"
                // onClick={() => {
                //     this.props.history.push("/home/profile");
                // }}
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
                <div style={{ display: "flex", alignItems: "center" }}>
                <p className="MyProfile-inner-1-2-name">
                    {this.state.userinfo.name}
                </p>
                {this.state.currentuser != this.state.dataid ? (
                    <div>
                    {this.state.follow ? (                        
                        this.state.status=="following"?(
                            <button
                            className="following-btn"
                            onClick={() => {
                                this.setState({ unfollowModel: true });
                            }}
                            >
                            following
                            </button>
                        ):(<button
                            className="following-btn"
                            onClick={() => {
                                this.setState({ unfollowModel: true });
                            }}
                            >
                            Requested
                            </button>)
                    ) : (<button
                        className="logout-btn"
                        onClick={() => {
                           
                            this.addfollowers(this.props.location.state.name);
                        }}
                        >
                        follow
                        </button>)
                    }
                    {this.state.unfollowModel ? (
                        <div className="followModel">
                        <div className="followModel-inner">
                            <button
                            className="logout-btn"
                            onClick={() => {
                                this.setState({
                              
                                unfollowModel: false
                                });
                                this.removefollowers(
                                this.props.location.state.name
                                );
                            }}
                            >
                            unfollow
                            </button>
                            <button
                            className="logout-btn"
                            onClick={() =>
                                this.setState({ unfollowModel: false })
                            }
                            >
                            close
                            </button>
                        </div>
                        </div>
                    ) : (
                        ""
                    )}
                    </div>
                ) : (
                    <> </>  
                )}
                </div>
                <div style={{ display: "flex" }}>
                <p>
                    <b>{this.state.postdata.length}</b> posts
                </p>
                <p>
                    {" "}
                    <b>{this.state.followers.length}</b> followers
                </p>
                <p>
                    <b>{this.state.following.length}</b> following
                </p>
                </div>
            </div>
            </div>
            <div className="MyProfile-inner-2">
            { this.state.userinfo.isprivate
            ?     
              this.state.status=="following"||this.state.ownaccount==true
              ?
              <ProfilePosts
                  userinfo={this.state.userinfo}
                  postdata={this.state.postdata}
                  ownaccount={this.state.ownaccount}
                  getpost={this.getpost}
              />
              :
              <div className="MyProfile-inner-2-2"><img src={privateAccountImg} /></div>
            :<ProfilePosts
            userinfo={this.state.userinfo}
            postdata={this.state.postdata}
            ownaccount={this.state.ownaccount}
            getpost={this.getpost}

        />
            }
            </div>
        </div>
        </div>
        
    
    );
  }
}

export default withRouter(OtherProfile);
