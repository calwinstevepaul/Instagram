import React, { Component } from 'react'
import defaultImage from "../img/DefaultProfilePic.jpg";
import unlike from "../img/heart.png";
import like from "../img/likedheart.png";
import comments from "../img/comments.png";
import share from "../img/share.png";
import {authApi} from "../../apicall"
import Comment from './Comment';
import menuIcon from '../img/3-dots-png-1.png'
import { withRouter } from "react-router-dom";


export class Posts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             comment:'',
             checkComment:false,
             replyCommentState:false,
             isMenu:false
        }
    }
    addcomment = (comment, id) => {
        if(comment==""||null){
            this.setState({
                checkComment:true
            })
            setTimeout(()=>{
                this.setState({
                    checkComment:false
                })
            },2000)
        }
        else{
            authApi.post("/update/addcomment",{ postId: id, comment:comment })
            .then(() => {
              this.props.getpost();
              this.setState({comment:''})
            })
        }
        
    };
    handelerMenu=()=>{
      this.setState({
        isMenu:!this.state.isMenu
      })
    }

    reportPost=(id)=>{
      this.setState({
        isMenu:false
      })
      authApi.post("/update/addreportpost",{postId:id})
      .then((res)=>{
          console.log(res)
          this.props.getpost();

      })
    }
    deletePost=(id)=>{
      this.setState({
        isMenu:false
      })
      authApi.post("/update/deletepost",{postId:id})
      .then((res)=>{
          console.log(res)
          this.props.getpost();

      })
    }
    visitProfile = (id,name) => {
      console.log(id);
      this.setState({ dropdown: true })
      this.props.history.push({pathname:"/home/profile/"+name,state:{name:id}})
    };
      
    render() {
        var liked = false;
        var likedNames = false;
        var likedNames_2 = false;
        var only2 = false;
        var lastName = "";
        var lastB4Name = "";
        this.props.data.likes.map(x => {
          if (this.props.data.likes.length > 2) {
            likedNames = true;
            lastName = this.props.data.likes[this.props.data.likes.length - 1].user.name;
            lastB4Name = this.props.data.likes[this.props.data.likes.length - 2].user.name;
          }
          if (this.props.data.likes.length === 1) {
            likedNames_2 = true;
            lastName = this.props.data.likes[this.props.data.likes.length - 1].user.name;
          }
          if (this.props.data.likes.length === 2) {
            only2 = true;
            lastName = this.props.data.likes[this.props.data.likes.length - 1].user.name;
            lastB4Name = this.props.data.likes[this.props.data.likes.length - 2].user.name;
          }
          if (x.userId === this.props.userinfo.id) {
            liked = true;
          }
        });
        var showcomment = false;
        if (this.props.data.comments.length > 0) {
          showcomment = true;
        }

        var postId = this.props.data.id;


        return (
          <div className="news_feed_inner">
            <div className="news_feed_inner-1">
              <div className="news_feed_inner-1-1">
                <img
                  width="35px"
                  height="35px"
                  className="loginInfo-img"
                  src={
                      this.props.data.user.profilePic ? this.props.data.user.profilePic : defaultImage
                  }
                  style={{cursor:"pointer"}}
                  onClick={()=>this.visitProfile(this.props.data.user.id,this.props.data.user.name)}
                />
                <p>
                  <b  
                  style={{cursor:"pointer"}}
                  onClick={()=>this.visitProfile(this.props.data.user.id,this.props.data.user.name)}
                  >
                    {this.props.data.user.name}</b>                  
                </p>
              </div>
              <div>
                <img  onClick={this.handelerMenu} style={{cursor:"pointer"}} width="20px" height="20px" src={menuIcon}/>
                {this.state.isMenu
                    ?
                      <div className="postMenu">{this.props.userinfo.id != this.props.data.userId
                        ?
                        <li onClick={()=>this.reportPost(this.props.data.id)}>Report Post</li>
                        :
                        <li onClick={()=>this.deletePost(this.props.data.id)}>Delete Post</li>
                        }
                        <li>help</li>

                      </div>
                    :
                    <></>
                }
              </div>   
              
            </div>
            <div>
              <img width="100%" src={this.props.data.postPhoto} />
            </div>
            <div className="news_feed_inner-3">
              {liked ? (
                <img
                  onClick={() => this.props.removelike(this.props.data.id)}
                  width="24px"
                  height="22px"
                  src={like}
                />
              ) : (
                <img
                  onClick={() => this.props.addlike(this.props.data.id)}
                  width="28px"
                  height="28px"
                  src={unlike}
                />
              )}
              <img width="48px" height="48px" src={comments} />
              <img width="25px" height="25px" src={share} />
            </div>
            <div className="news_feed_inner-4">
              <b>{this.props.data.likes.length} likes</b>
            </div>
            <div className="news_feed_inner-5">
              {likedNames ? (
                <p>
                  Liked by <b>{lastName}</b>, <b>{lastB4Name}</b> and{" "}
                  <b>{this.props.data.likes.length - 2} others</b>
                </p>
              ) : (
                <p></p>
              )}

              {likedNames_2 ? (
                <p>
                  Liked by <b>{lastName}</b>
                </p>
              ) : (
                <p></p>
              )}

              {only2 ? (
                <p>
                  Liked by <b>{lastName}</b> and <b>{lastB4Name}</b>
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <div className="news_feed_inner-6">
              <p>
                <b>{this.props.data.user.name}</b> {this.props.data.postDescription}
              </p>
            </div>

            <div className="news_feed_inner-7">
              {showcomment
                ? this.props.data.comments.map(x => {
                    
                    return (
                      <Comment {...this.props} x={x}/>

                    );
                  })
                : ""}
            </div>
            <div className="postDate">
              {new Date(this.props.data.createdAt).toDateString()}
            </div>
            <div className="news_feed_inner-8" style={this.state.checkComment?{border:'1px solid red'}:{border:'none'}} >
                  <input 
                      className="commentsinput"
                      value={this.state.comment}
                      onChange={e => {                          
                          this.setState({
                              comment:e.target.value
                          })
                      }}
                      placeholder="Add a comment..."
                  />
                  <button
                      name={postId}
                      className="commentsbtn"
                      onClick={() => this.addcomment(this.state.comment,postId)}
                  >Post</button>
            </div>
          </div>
        );
    }
}

export default withRouter (Posts)
