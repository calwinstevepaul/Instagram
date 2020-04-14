import React, { Component } from 'react'
import menuIcon from '../../img/3-dots-png-1.png'
import {authApi} from "../../../apicall"



export class ProfilePostsPhotos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isMenu:false
        }
    }
    handelerMenu=()=>{
        this.setState({
            isMenu:!this.state.isMenu
          })
    }

    deletePost=(id)=>{
        this.setState({
          isMenu:false
        })
        authApi.post("/update/deletepost",{postId:id})
        .then((res)=>{
            console.log(res)
            this.props.getpost(this.props.post.userId);
  
        })
    }
    
    render() {
        return (
           <div className="userPosts">
                <img className={this.props.ownaccount?"userPost-img":""} width="300px" height="300px" src={this.props.post.postPhoto}/>
                {this.props.ownaccount?
                     <div className="userPosts-btn">
                        <img  onClick={this.handelerMenu} style={{cursor:"pointer"}} width="20px" height="20px" src={menuIcon}/>
                        {this.state.isMenu?                           
                             <div>
                                 <div className="followReq-close-2" onClick={this.handelerMenu}></div>  
                                 <div className="postMenu">   
                                    <li onClick={()=>this.deletePost(this.props.post.id)}>Delete Post</li>
                                    <li>help</li>
                                 </div>
                             </div>     
                         :
                         <></>  
                        }
                     </div>
                :<></>
                } 
               
           </div>
        )
    }
}

export default ProfilePostsPhotos
