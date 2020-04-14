import React, { Component } from 'react'
import ProfilePostsPhotos from './ProfilePostsPhotos'

export class ProfilePosts extends Component {
    render() {
        var userid=this.props.userinfo.id
        return (
            <div className="ProfilePost">
                {this.props.postdata.map(post =>{
                    if(userid == post.userId){
                     return (
                         <ProfilePostsPhotos  getpost={this.props.getpost} ownaccount={this.props.ownaccount} post={post} />
                     )
                    }
                })}
            </div>
        )
    }
}

export default ProfilePosts
